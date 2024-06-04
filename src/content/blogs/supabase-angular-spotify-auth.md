---
name: "Supafy: An Angular v17 Guide to User Authentication, Management, and Spotify OAuth Social Login using Supabase"
published: 02/09/2024
description: A step by step guide on building an Angular 17 application with authentication via Spotify OAuth using Supabase Social Login
imageUrl: /images/sb-hero.png
slug: supabase-angular-spotify-auth
featured: true
tags: ["tutorial", "supabase", "angular", "spotify"]
---

## Overview

Welcome to my brief yet comprehensive guide on getting started with Supabase, the open-source Firebase alternative. In this post, I’ll walk you through the process of:

- Building an Angular 17 application
- Adding authentication via Spotify OAuth using Supabase Social Login
- Gathering and displaying users’ Spotify data
- Configuring Supabase Triggers for efficient database maintenance

Being new to Supabase, I got my first introduction from a very helpful Supabase official blog: <a href="https://supabase.com/docs/guides/getting-started/tutorials/with-angular?database-method=dashboard" target="_blank">Build a User Management App with Angular</a> which you may reference as needed! This blog post will take many items from the official Supabase post, but I will be adding my own flair as it fits to my projects’ scope. For example, while the Supabase tutorial is a great starting point, it’s not necessarily of the _Angular flavor_. And likewise, the Supabase tutorial implements Magic Link login, however, our Angular app will use Spotify OAuth for login!

You can find the source code for this project on my <a href="https://github.com/KaliaHayes/supabase-angular-spotify-auth" target="_blank">supabase-angular-spotify-auth</a> GitHub Repo!

## Base vs Base
Until recently, I had defaulted to using <a href="https://firebase.google.com/" target="_blank">Firebase</a> to handle my applications’ user management and storage - with great success! A driving factor for that was simply how well Firebase + Angular is documented, supported, and generally championed by the Angular community. However, as I continued to build more complex applications, such as <a href="http://zeus.fm" target="_blank">zeus.fm</a>, I found reasons to be curious about “alternatives solutions”, so to speak😄.

Specifically, I was interested in authenticating my users with Spotify’s OAuth. And while I did succeed in utilizing Firebase to handle this need by way of implementing Cloud Functions, I happened to stumble upon some info that had me looking towards Supabase’s way! 👀

While Firebase provides countless user authentication sing-in methods that are built in and _just work_ without any fuss, I noticed that Supabase actually has even more options for <a href="https://supabase.com/docs/guides/auth/social-login" target="_blank">Social Login (OAuth)</a>, _including_ Spotify. So that brings me to right now - being a "supa fan" after having explored Supabase and many of it’s features!

> Social Login (OAuth) is an open standard for authentication that allows users to log in to one website or application using their credentials from another website or application. OAuth allows users to grant third-party applications access to their online accounts without sharing their passwords.
> — <cite><a href="https://supabase.com/docs/guides/auth/social-login" target="_blank">Supabase - Social Login</a></cite>

---

## Supabase Project Setup

To begin, we’ll go ahead and set up a Supabase project. Feel free to reference the Supabase <a href="https://supabase.com/docs/guides/getting-started" target="_blank">official docs</a> at any point to further your understanding! Likewise, I also recommend skimming through the Supabase official <a href="https://supabase.com/docs/guides/auth/social-login/auth-spotify" target="_blank">Login with Spotify</a> tutorial.

### Create a Project

1. <a href="https://supabase.com/dashboard" target="_blank">Create a new project</a> in the Supabase Dashboard
2. Enter your project details
3. Wait for the new database to launch

### Set up the Database Schema and Triggers

We will leverage the User Management Starter template and apply a few modifications to fit our project scope.

1. Navigate to the SQL Editor page on the Supabase dashboard
2. Select ‘Quickstarts’ and choose the User Management Starter
3. Modify the query to match the following:

```typescript
-- Create a table for public profiles
create table
  profiles (
    id uuid references auth.users on delete cascade not null primary key,
    spotify_id text,
    name text,
    email text,
    avatar_url text,
    premium boolean,
    country text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table
  profiles enable row level security;

create policy
  "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy
  "Users can insert their own profile." on profiles for insert
with
  check (auth.uid () = id);

create policy
  "Users can update own profile." on profiles for
update
  using (auth.uid () = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create
or replace function public.handle_new_user () returns trigger as $$

begin
  insert into public.profiles (id, spotify_id, email, name, avatar_url, created_at)
  values (new.id, new.raw_user_meta_data->>'provider_id', new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url', new.created_at);
  return new;
end;
$$ language plpgsql security definer;

create trigger
  on_auth_user_created
after
  insert on auth.users for each row
execute
  procedure public.handle_new_user ();

-- This trigger will delete the users profile row when a user is deleted
create
or replace function delete_old_profile () returns trigger language 'plpgsql' security definer as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger
  before_delete_user before delete on auth.users for each row
execute
  function public.delete_old_profile ();
```

4. Click **Run**

This SQL script creates a `profiles` table your Supabase database with fields:`id`, `spotify_id`, `name`, `email`, `avatar_url`, `premium`, `country`, `created_at`, and `updated_at`. It enables Row Level Security (RLS) on the table and sets up policies to control access to the data. It also creates two triggers: one that automatically creates a profile when a new user is added to the `auth.users` table, and another that deletes a user's profile when the user is deleted from `auth.users`. These triggers are implemented through functions `handle_new_user` and `delete_old_profile` respectively.

### Get the API Keys

Now that you have your `profiles` table, you are ready to insert data using the auto-generated API. We just need to get the Project URL and `anon` key from the API settings.

1. Go to the <a href="https://supabase.com/dashboard/project/_/settings/api" target="_blank">API Settings</a> page in the Dashboard
2. Find your Project `URL`, `anon`, and `service_role` keys on this page and save them for later

---

## Creating a Spotify App and Enabling Spotify Auth in your Supabase Project

Next up, we’ll go ahead and handle the Spotify Project creation. To enable Spotify Auth for your project, you need to set up a Spotify OAuth application and add the application credentials to your Supabase Dashboard.

***Disclaimer**: I will be copying and pasting the exact steps from the Supabase official <a href="https://supabase.com/docs/guides/auth/social-login/auth-spotify" target="_blank">Login with Spotify</a> tutorial up until the ‘Add login code to your client app’ step - we’ll handle that later in the tutorial!*

Setting up Spotify logins for your application consists of 3 parts:

1. Create and configure a Spotify Project and App on the <a href="https://developer.spotify.com/dashboard/" target="_blank">Spotify Developer Dashboard</a>
2. Add your Spotify `API Key` and `API Secret Key` to your <a href="https://supabase.com/dashboard" target="_blank">Supabase Project</a>
3. Add the login code to your <a href="https://github.com/supabase/supabase-js" target="_blank">Supabase Client App</a>

### Access your Spotify Developer account
![sb-spotify-db](/images/sb-spotify.png)

- Log into <a href="https://spotify.com/" target="_blank">Spotify</a>
- Access the <a href="https://developer.spotify.com/dashboard" target="_blank">Spotify Developer Dashboard</a>

### Find your callback URL

The next step requires a callback URL, which looks like this: `https://<project-ref>.supabase.co/auth/v1/callback`

- Go to your <a href="https://supabase.com/dashboard" target="_blank">Supabase Project Dashboard</a>
- Click on the `Authentication` icon in the left sidebar
- Click on `Providers` under the Configuration section
- Click on **Spotify** from the accordion list to expand and you'll find your **Redirect URL**, you can click `Copy` to copy it to the clipboard

### Create a Spotify OAuth app

- Log into <a href="https://spotify.com/" target="_blank">Spotify</a>
- Go to the <a href="https://developer.spotify.com/dashboard" target="_blank">Spotify Developer Dashboard</a>
- Click `Create an App`
- Type your `App name`
- Type your `App description`
- Check the box to agree with the `Developer TOS and Branding Guidelines`
- Click `Create`
- Save your `Client ID`
- Save your `Client Secret`
- Click `Edit Settings`

Under `Redirect URIs`:

- Paste your Supabase Callback URL in the box
- Click `Add`
- Click `Save` at the bottom

### Add Yourself as a User to your Spotify App

- Go to App Settings
- Click User Management
- Add your name and email and click **Add user**

### Enter your Spotify credentials into your Supabase project

- Go to your <a href="https://supabase.com/dashboard" target="_blank">Supabase Project Dashboard</a>
- In the left sidebar, click the `Authentication` icon (near the top)
- Click on `Providers` under the Configuration section
- Click on **Spotify** from the accordion list to expand and turn **Spotify Enabled** to ON
- Enter your **Spotify Client ID** and **Spotify Client Secret** saved in the previous step
- Click `Save`

---

## Building an Angular 17 Application

I will assume that you are already aware of Angular and all it’s features - but if not, you can learn more about building an Angular app by referencing the *revitalized* <a href="https://angular.dev/" target="_blank">official Angular docs</a>.

1. Use the Angular CLI to initialize a new Angular project

```typescript
npx ng new supabase-angular-spotify-auth --style css
cd supabase-angular-spotify-auth
```

2. Install `supabase-js`

```typescript
npm i @supabase/supabase-js
```

3. Save the Supabase project details as environment variables in `environment.ts`

```typescript
// environment.ts

export const environment = {
  production: false,
  supabaseUrl: "<your_supabase_project_url>", // https://examplesupabaseurl.supabase.co
  supabaseKey: "<your_supabase_api_key>",
  supabaseAuthToken: "sb-<your_supabase_reference_id>-auth-token", // sb-examplesupabaseurl-auth-token
};
```

***Note**: You can find your `supabaseUrl` and `supabaseKey` values by going to **Project Settings > Configuration > API.** These variables will be exposed on the browser, and that's completely fine since we have <a href="https://supabase.com/docs/guides/auth#row-level-security" target="_blank">Row Level Security</a> enabled on our Database. You can find your Supabase Reference ID on **Project Settings > General***

4. Update the `styles.css` by copying and pasting the css from the <a href="https://github.com/KaliaHayes/supabase-angular-spotify-auth/blob/main/src/styles.css" target="_blank">source code</a>

### Create our App Components and Service

If you have already explored my reference project, you will see that my components are all one-file standalone components with inline template and style options, and no .spec files. If you would like the same set up, you can update your schematics in `angular.json` before creating your components and service:

```typescript
"@schematics/angular:component": {
    "skipTests": true,
    "standalone": true,
    "inlineStyle": true,
    "inlineTemplate": true
}
```

Run the following CLI commands to create our Auth and Account component, and a Supabase service:

```typescript
ng g c auth
ng g c account
ng g s supabase
```

### Configure the Supabase Service

Now, the fun begins! We’ll begin by setting up our Supabase service. You may view the <a href="https://github.com/KaliaHayes/supabase-angular-spotify-auth/blob/main/src/app/services/supabase.service.ts" target="_blank">source code</a> for our service, but keep in mind that the source code does not contain most of the in-line comments you will see below. 😄

First, add all necessary imports, interfaces, and define our service variables which we will use throughout the service:

```typescript
// Imports
import { Injectable, effect, signal, inject } from "@angular/core";
import { AuthSession, createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

// Interfaces
export interface UserProfile {
  id?: string;
  spotify_id?: string;
  name?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
  premium?: boolean;
  country?: string;
  email?: string;
}

export interface SpotifyProfile {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  followers: {
    href: null;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
}
```

```typescript
// Supabase client instance for interacting with the Supabase backend
private supabase: SupabaseClient;
private route = inject(ActivatedRoute);
private http = inject(HttpClient);

// Session BehaviorSubject, Observable, and Signal
private sessionSubject = new BehaviorSubject<AuthSession | null>(null);
session$ = this.sessionSubject.asObservable();
$session = toSignal(this.session$, { initialValue: null });

// User BehaviorSubject, Observable, and Signal
private userSubject = new BehaviorSubject<User | null>(null);
user$ = this.userSubject.asObservable();
$user = toSignal(this.user$, { initialValue: null });

// Signals for profile, current user, and email verification state
$profile = signal<Profile>({});
$currentUser = signal<string>('');
$showEmailVerificationMessage = signal<boolean>(false);
```

Next, we’ll set up our constructor to create the Supabase client using our `supabaseUrl` and `supabaseKey` , subscribe to changes in the route `queryParams`, and listen to changes in our Supabase authentication state:

```typescript
constructor() {
  // Create a new Supabase client using the URL and key from the environment
  this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  // Subscribe to route query parameters
  this.route.queryParams.subscribe(({ error_description }) => {
		/**
		If there's an error related to Spotify, set the $showEmailVerificationMessage
	  signal to true.
	  For example, when a user signs in with Spotify for the first time,
	  we get an error related to the user not yet verifying their email
	  **/
    if (error_description && error_description.includes('spotify')) {
      this.$showEmailVerificationMessage.set(true);
    }
  });

  // Listen for changes in the authentication state
  this.supabase.auth.onAuthStateChange((event, session) => {
    // Log the event and session for quick viewing
    console.log('event: ', event);
    console.log('session: ', session);

    // Update the session state
    this.sessionSubject.next(session);

    // If there's no session, set the session state to null and return
    if (!session) {
      this.sessionSubject.next(null);
      return;
    }

    // If the user has just signed in or this is the initial session
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
      // If there's no provider token, call sign in with Spotify to receive it
      if (!session.provider_token) {
        this.signInWithSpotify().subscribe();
      }
      // If there's no current user, set the current user and get the user details
      else if (!this.$currentUser()) {
        this.$currentUser.set(session.user?.id ?? '');
        this.getUser();
      }

      // Hide the email verification message
      this.$showEmailVerificationMessage.set(false);
    }

    // If the token has been refreshed, refresh the session and get the user details
    if (event === 'TOKEN_REFRESHED') {
      this.supabase.auth.refreshSession();
      this.getUser();
    }

    // If the user has been updated, set the current user and get the user details
    if (event === 'USER_UPDATED') {
      this.$currentUser.set(session.user?.id ?? '');
      this.getUser();
    }
  });
}
```

We’ll define our `signInWithSpotify` method which signs in the user with Spotify using OAuth. It requests a number of permissions (scopes) that allow the app to read and modify the user's Spotify data. The `from` function is used to convert the Promise returned by `signInWithOAuth` into an Observable:

```typescript
// Method to sign in with Spotify
signInWithSpotify(): Observable<any> {
  // Return an Observable from the Promise returned by `signInWithOAuth`
  return from(
    // Call `signInWithOAuth` on the Supabase auth object
    this.supabase.auth.signInWithOAuth({
      // Specify Spotify as the provider
      provider: 'spotify',
      // Specify the options for the OAuth sign in
      options: {
        // Specify the scopes (permissions) that the app is requesting
        scopes:
          'user-read-currently-playing, user-read-recently-played, user-read-playback-state, user-top-read, user-modify-playback-state, user-library-read, user-library-modify, user-read-private, playlist-read-private, playlist-read-collaborative, playlist-modify-public, playlist-modify-private, user-read-email, user-follow-read',
      },
    })
  );
}
```

Then, we will define our `getUser` method which gets the current user from the Supabase auth object. If there's an error, it logs the error and returns. If there's a user, it updates the user state and calls to get the user's profile using the `getProfile` method we’ll define next:

```typescript
// Method to get the current user
getUser() {
  // Call `getUser` on the Supabase auth object
  this.supabase.auth
    .getUser()
    .then(({ data, error }) => {
      // If there's an error, log it and return
      if (error) {
        console.error('Error getting user', error);
        return;
      }

      // Extract the user from the data
      const { user } = data ?? {};
      // Update the user state
      this.userSubject.next(user ?? null);

      // If there's a user, log it and get the user's profile
      if (user) {
        console.log('user: ', user);
        this.getProfile(user).subscribe();
      }
    })
    // If there's an error, log it
    .catch((error) => {
      console.error('Error getting user', error);
    });
}

```

As mentioned above, we’ll define our `getProfile` method which gets the profile of a user from the 'profiles' table in Supabase. If the profile has a Spotify ID, it makes a `GET` request to the Spotify API to get the user's Spotify profile. If the profile's `premium` or `country` fields are null (which they will be when a new user first signs in, as we do not store them in the database with our `handle_new_user` trigger function), it updates these fields with the corresponding fields from the Spotify profile and updates the profile in Supabase. We also update the user’s `avatar_url` with the link to the higher quality image returned from the Spotify profile:

```typescript
// Method to get the profile of a user
getProfile(user: User): Observable<any> {
  // Return an Observable from the Promise returned by the Supabase query
  return from(
    // Query the 'profiles' table in Supabase where the 'id' equals the user's 'id'
    this.supabase.from('profiles').select().eq('id', user.id).single()
  ).pipe(
    // Use the 'tap' operator to perform a side effect
    tap(({ data, error }) => {
      // If there's an error, throw it
      if (error) throw error;
      // Set the profile data
      this.$profile.set(data);
    }),
    // Use the 'switchMap' operator to map over the data and return a new Observable
    switchMap(({ data }) => {
      // Cast the data to a UserProfile
      let profile = data as UserProfile;
      // Get the Spotify ID from the profile
      const spotifyId = profile?.spotify_id;

      // If there's a Spotify ID
      if (spotifyId) {
        // Make a GET request to the Spotify API to get the user's Spotify profile
        return this.http
          .get(`https://api.spotify.com/v1/me`, {
            headers: {
              // Include the provider token in the Authorization header
              Authorization: `Bearer ${this.$session()?.provider_token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            // Catch any errors and log them
            catchError((err) => {
              console.error('Error getting Spotify profile', err);
              return of({});
            }),
            // Map the response to a SpotifyProfile
            map((response) => response as SpotifyProfile),
            // Use 'switchMap' to map over the SpotifyProfile and return a new Observable
            switchMap((spotifyProfile: SpotifyProfile) => {
              console.log('Spotify profile: ', spotifyProfile);
              // If the profile's 'premium' or 'country' fields are null
              if (profile.premium === null || profile.country === null) {
                // Set the 'premium' field to whether the Spotify product is 'premium'
                profile.premium = spotifyProfile.product === 'premium';
                // Set the 'country' field to the Spotify profile's country
                profile.country = spotifyProfile.country;

                // If there are images in the Spotify profile
                if (
                  spotifyProfile.images &&
                  spotifyProfile.images.length >= 2
                ) {
                  // Set the 'avatar_url' field to the URL of the second image
                  profile.avatar_url =
                    spotifyProfile.images[1]?.url || profile.avatar_url;
                }

                // Update the profile in Supabase
                return this.updateProfile(profile).pipe(
                  tap(({ error }) => {
                    // If there's an error, throw it
                    if (error) throw error;
                  })
                );
              }
              // If the 'premium' and 'country' fields are not null, return the SpotifyProfile
              return of(spotifyProfile);
            })
          );
      }

      // If there's no Spotify ID, return the profile
      return of(profile);
    })
  );
}
```

To handle updating the user’s profile with their `premium` status, `country`, and higher quality `avatar_url`, we will define our `updateProfile` method. This method updates a user's profile in the 'profiles' table in Supabase. It creates an update object with the profile data and the current date as the `updated_at` field, then upserts (updates or inserts) this object in the table. If there's an error, it throws the error. It converts the Promise to an Observable and returns it:

```typescript
// Method to update a user's profile
updateProfile(profile: UserProfile): Observable<any> {
  // Create an update object with the profile data and the current date as the 'updated_at' field
  const update = {
    ...profile,
    updated_at: new Date(),
  };

  // Create a Promise to upsert (update or insert) the profile in the 'profiles' table in Supabase
  const updateProfilePromise = this.supabase
    .from('profiles')
    .upsert(update)
    .then(({ data, error }) => {
      // If there's an error, throw it
      if (error) throw error;
      // Return the data
      return data;
    });

  // Convert the Promise to an Observable and return it
  return from(updateProfilePromise);
}

```

Finally(!), we will define our signOut method which signs out the user, removes the user’s session item from local storage, and handles any errors that might occur during this process:

```typescript
// Method to sign out the current user & manually remove the local storage item
signOut(): Observable<any> {
  return from(this.supabase.auth.signOut()).pipe(
    tap(() => {
      window.localStorage.removeItem(environment.supabaseAuthToken);
    }),
    catchError((error) => {
      console.error('Error during sign out:', error);
      throw error;
    })
  );
}
```

### Update the Auth and Account Components

Now that we’ve configured our `supabase` service, we will make use of it via our two components, `Auth` and `Account`!

Our `Auth` component uses the `SupabaseService` to sign in with Spotify. The component's template includes a button that, when clicked, calls the `signInWithSpotify` method. If the `supabase.$showEmailVerificationMessage()` method returns `true`, a confirmation message is displayed:

```typescript
import { Component, inject } from "@angular/core";
import { SupabaseService } from "../services/supabase.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="row flex-center flex">
      <div class="col-6 form-widget" aria-live="polite">
        <h1 class="header">Supabase + Angular + Spotify</h1>
        <p class="description">Welcome to my introduction to Spotify OAuth with Supabase & Angular! Sign in with Spotify to get started ⚡</p>
        <div>
          <button class="button green block" (click)="supabase.signInWithSpotify()">Sign In With Spotify</button>
          <p *ngIf="supabase.$showEmailVerificationMessage()" class="confirmation">A confirmation email has been sent to your Spotify email! Please click the link in the email to verify your email address.</p>
        </div>
        <p>
          Made by
          <a href="https://kaliahayes.com" target="_blank">Kalia Hayes</a>
        </p>
      </div>
    </div>
  `,
})
export class AuthComponent {
  public readonly supabase: SupabaseService = inject(SupabaseService);
}
```

Our Account component uses the `SupabaseService` to access the user's profile data. The component's template includes a form that displays the user's avatar, name, email, Spotify ID, premium status, country, creation date, and last update date. If the user's profile does not have an avatar, a default avatar is displayed. The form also includes a button that, when clicked, signs the user out:

```typescript
import { Component, inject } from "@angular/core";
import { SupabaseService } from "../services/supabase.service";
import { NgIf, NgStyle } from "@angular/common";
import { from } from "rxjs";

@Component({
  selector: "app-account",
  standalone: true,
  imports: [NgIf, NgStyle],
  template: `
    <div style="width: 50vw">
      <form class="form-widget">
        <div
          *ngIf="supabase.$profile().avatar_url; else noImage"
          class="avatar"
          [ngStyle]="{
            'background-image': 'url(' + supabase.$profile().avatar_url + ')'
          }"
        ></div>
        <ng-template #noImage>
          <div class="avatar no-image"></div>
        </ng-template>
        <div>
          <label for="email">Name</label>
          <input id="name" type="text" [value]="supabase.$profile().name" disabled />
        </div>

        <div>
          <label for="email">Email</label>
          <input id="email" type="text" [value]="supabase.$profile().email" disabled />
        </div>

        <div>
          <label for="email">Spotify ID</label>
          <input id="name" type="text" [value]="supabase.$profile().spotify_id" disabled />
        </div>

        <div>
          <label for="email">Name</label>
          <input id="name" type="text" [value]="supabase.$profile().name" disabled />
        </div>

        <div>
          <label for="email">Premium?</label>
          <input id="name" type="text" [value]="supabase.$profile().premium" disabled />
        </div>

        <div>
          <label for="email">Country</label>
          <input id="name" type="text" [value]="supabase.$profile().country" disabled />
        </div>

        <div>
          <label for="email">Created At</label>
          <input id="name" type="text" [value]="supabase.$profile().created_at" disabled />
        </div>

        <div>
          <label for="email">Updated At</label>
          <input id="name" type="text" [value]="supabase.$profile().updated_at" disabled />
        </div>

        <div>
          <button class="button block" (click)="signOut()">Sign Out</button>
        </div>
      </form>
    </div>
  `,
})
export class AccountComponent {
  public readonly supabase: SupabaseService = inject(SupabaseService);

  signOut(): void {
    const signOut$ = from(this.supabase.signOut());

    signOut$.subscribe({
      error: (error) => {
        if (error instanceof Error) {
          alert(error.message);
        }
      },
    });
  }
}
```

### Update the App Component

So far, we’ve defined our Supabase service and Auth and Account components, but if you’ve already served the application, you’re most likely still staring at the Angular default application landing page! Our final step will be to update `app.component.ts`. This component uses the `SupabaseService` to check if there is a current session and if the session has a provider token. If both conditions are true, it displays the `AccountComponent` which shows the user's account information. If not, it displays the `AuthComponent` which allows the user to sign in:

```typescript
import { Component, inject } from "@angular/core";
import { SupabaseService } from "./services/supabase.service";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AccountComponent, AuthComponent, NgIf],
  template: `
    <div class="container">
      <app-account *ngIf="supabase.$session() && supabase.$session()?.provider_token; else auth"></app-account>
      <ng-template #auth>
        <app-auth></app-auth>
      </ng-template>
    </div>
  `,
})
export class AppComponent {
  public readonly supabase: SupabaseService = inject(SupabaseService);

  title = "supabase-auth";
}
```

## Using our Angular Spotify OAuth Application

If you haven’t already, it’s time to server our application! In your terminal, run:

```typescript
ng serve --o
```

You will be met with this simple sign in screen - Go ahead and sign in and grant our application all access!

![sb-signin](/images/sb-signin.png)

Upon navigating back to our application, we now see a Spotify green colored alert, letting us know that we must first verify our email address:

![sb-confirm](/images/sb-confirm.png)

If you recall in our `Supabase` service, we are listening to our route queryParams to understand any Spotify related errors. Take at look at the current URL and you will see an error description that reads **_Unverified email with Spotify. A confirmation email has been sent to your Spotify email._** This is why we see our email verification message!

Go ahead and check your Spotify email inbox for the verification email, and click the link seen in the email.

You should now see our Account component, and all your Spotify profile info, including the elements we took directly from the Spotify API user profile response, `premium` and `country` .

![sb-acct](/images/sb-acct.png)

Navigating back to the **Supabase Dashboard > Authentication > Users** - you’ll see your first user - yourself! From here, your only option is to sign out… for now 😉

## Signing Off

Congratulations on making it to the end of this comprehensive guide on user authentication and social login using Spotify OAuth and Supabase in an Angular v17 application. By following the steps outlined in this post, you've successfully set up a Supabase project, configured Spotify as an OAuth provider, and created an Angular application with all the necessary dependencies.

You've also learned how to create a robust Supabase service with functionalities for signing in with Spotify, retrieving user and profile details, and handling sign-outs. By integrating this service into your Auth and Account components, you're now able to manage the sign-in process and display user account information effectively.

Happy coding!

<template>
  <app-alert
    v-if="error"
    alertTitle="Error"
    alertText="Unable to update your profile"
    alertType="error"
  ></app-alert>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Edit Profile
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="First name*"
                  hint="Input your First name"
                  :model-value="firstName"
                  required

                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Last name*"
                  hint="Input your Last name"
                  required
                  :model-value="lastName"

                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Profile Bio*"
                  :model-value="profileBio"

                ></v-textarea>
              </v-col>

              <v-file-input
                :rules="fileRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              ></v-file-input>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="updateProfile"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { User } from '@/models/User';
import { useUserStore } from '@/store/UserStore';
  export default {
    name: "TheEditAccount",
    setup() {
      const userStore = useUserStore();
      return {
        userStore,
      };
    },
    props: {
      userID: Number,
      profileBio: String,
      firstName: String,
      lastName: String,
    },
    data() {
      return {
        user: {} as User,
        dialog: false,
        error: false,
        rules: {
          firstNames: (value: string) => {
            const pattern = /^[a-zA-Z]+$/
            return pattern.test(value) || 'Invalid first Name. Use only letters!'
          },
          lastName: (value: string) => {
            const pattern = /^[a-zA-Z]/
            return pattern.test(value) || 'Invalid, use only letters!'
          },
        },
        fileRules: [
          (file: File) => {
            return !file || file.size < 2000000 || 'Avatar size should be less than 2 MB!';
          },
        ],
      };
    },
    methods: {
      async updateProfile() {
        this.user.id = this.userID;
        this.user.profile.bio = this.profileBio;
        this.user.firstName = this.firstName;
        this.user.lastName = this.lastName;
        console.log(this.user);
        const returnedUser = await this.userStore.updateUser(this.user);
        console.log(returnedUser);
        if (returnedUser) {
          this.dialog = false;
          return;
        }
        this.error = true;
        //?TO-DO add error to user store
        console.log('error');

      }
    },
  }
</script>

<style>


</style>

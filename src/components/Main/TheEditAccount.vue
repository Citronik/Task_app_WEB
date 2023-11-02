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
          prepend-icon="mdi-pencil"
        >
          Edit
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
                  v-model="newFirstName"
                  required
                  clearable
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
                  v-model="newLastName"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Profile Bio*"
                  v-model="newProfileBio"
                ></v-textarea>
              </v-col>

              <v-file-input
                variant="solo"
                :rules="fileRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                @input="newAvatar"
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
            @click="dialog = !dialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="updateProfile"
          >
            Update
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
      const newProfileBio = userStore.user.profile?.bio || '';
      const newFirstName = userStore.user.firstName || '';
      const newLastName = userStore.user.lastName || '';
      return {
        userStore,
        newProfileBio,
        newFirstName,
        newLastName,
      };
    },
    data() {
      return {
        dialog: false,
        error: false,
        newAvatar: [] as File[],
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
          (file: File[]) => {
            return !file || !file.length || file[0].size < 10000000 || 'Avatar size should be less than 10 MB!';
          },
        ],
      };
    },
    methods: {
      async updateProfile() {
        const user = new User();
        user.profile.bio = this.newProfileBio;
        user.firstName = this.newFirstName;
        user.lastName = this.newLastName;
        console.log('1 editAccount user: ', user);
        user.profile.avatar = this.newAvatar[0];
        console.log('2 editAccount user: ', user);
        await this.userStore.updateUser(user);
        this.dialog = false;
      }
    },
  }
</script>

<style>


</style>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="message"
            clearable
            label="Message"
            type="text"
            variant="outlined"
            @input="emitMessage"
            @enter="clickMe"
          >
            <template v-slot:prepend>
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                </template>

                I'm a tooltip
              </v-tooltip>
            </template>

            <template v-slot:append-inner>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="loading"
                  color="info"
                  indeterminate
                  size="24"
                ></v-progress-circular>
              </v-fade-transition>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
  export default {
    props: {
      modelValue: String,
    },
    data: () => ({
      message: '',
      loading: false,
    }),
    methods: {
      emitMessage() {
        //this.$emit('update:message', this.message);
        this.$emit('update:modelValue', this.message);
      },
      clickMe () {
        this.loading = true
        this.message = 'Wait for it...'
        setTimeout(() => {
          this.loading = false
          this.message = `You've clicked me!`
        }, 2000)
      },
    },
  }
</script>

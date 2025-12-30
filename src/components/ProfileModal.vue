<template>
  <div @click="checkClick" ref="profileWrap" class="profile-wrap flex flex-column">
    <form @submit.prevent="saveProfile" class="profile-content">
      <h1>Edit Profile</h1>
      <p class="description">This information will be auto-filled in the "Bill From" section</p>

      <div class="profile-form flex flex-column">
        <div class="input flex flex-column">
          <label for="profileName">Your Name / Company Name</label>
          <input type="text" id="profileName" v-model="profile.name" />
        </div>
        <div class="input flex flex-column">
          <label for="profileStreetAddress">Street Address</label>
          <input type="text" id="profileStreetAddress" v-model="profile.streetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="profileCity">City</label>
            <input type="text" id="profileCity" v-model="profile.city" />
          </div>
          <div class="input flex flex-column">
            <label for="profileZipCode">Zip Code</label>
            <input type="text" id="profileZipCode" v-model="profile.zipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="profileCountry">Country</label>
            <input type="text" id="profileCountry" v-model="profile.country" />
          </div>
        </div>
      </div>

      <div class="actions flex">
        <div class="left">
          <button type="button" @click="closeProfile" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button type="submit" class="purple">Save Profile</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "profileModal",
  data() {
    return {
      profile: {
        name: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        country: '',
      },
    };
  },
  created() {
    // Load existing profile data
    this.profile = { ...this.userProfile };
  },
  methods: {
    ...mapMutations(["TOGGLE_PROFILE_MODAL", "UPDATE_USER_PROFILE"]),

    checkClick(e) {
      if (e.target === this.$refs.profileWrap) {
        this.closeProfile();
      }
    },

    closeProfile() {
      this.TOGGLE_PROFILE_MODAL();
    },

    saveProfile() {
      this.UPDATE_USER_PROFILE(this.profile);
      this.TOGGLE_PROFILE_MODAL();
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
};
</script>

<style lang="scss" scoped>
.profile-wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  background-color: rgba(0, 0, 0, 0.5);
  &::-webkit-scrollbar {
    display: none;
  }

  .profile-content {
    position: absolute;
    right: 0;
    top: 0;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-y: auto;
    
    @media (max-width: 900px) {
      max-width: 90%;
    }

    h1 {
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .description {
      margin-bottom: 32px;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .profile-form {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    .actions {
      margin-top: 40px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
    color: var(--text-secondary);
  }

  input {
    width: 100%;
    background-color: var(--input-bg);
    color: var(--text-primary);
    border-radius: 4px;
    padding: 12px 4px;
    border: 1px solid var(--border-color);
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #7c5dfa;
    }
  }
}
</style>

<template>
  <div v-if="invoicesLoaded" :class="{ 'dark-mode': darkMode, 'light-mode': !darkMode }">
    <button class="theme-toggle-btn" @click="toggleDarkMode" :title="darkMode ? 'Light Mode' : 'Dark Mode'">
      <img src="@/assets/icon-moon.svg" :alt="darkMode ? 'Light Mode' : 'Dark Mode'" />
    </button>
    <button class="profile-btn" @click="toggleProfile" title="Edit Profile">
      <span class="profile-icon">#</span>
    </button>
    <div class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <transition name="profile">
          <ProfileModal v-if="profileModal" />
        </transition>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Navigation from "./components/Navigation";
import InvoiceModal from "./components/InvoiceModal";
import ProfileModal from "./components/ProfileModal";
import Modal from "./components/Modal";
export default {
  data() {
    return {
    };
  },
  components: {
    Navigation,
    InvoiceModal,
    ProfileModal,
    Modal,
  },
  created() {
    this.GET_INVOICES();
  },
  methods: {
    ...mapActions(["GET_INVOICES"]),
    ...mapMutations(["TOGGLE_DARK_MODE", "TOGGLE_PROFILE_MODAL"]),

    toggleDarkMode() {
      this.TOGGLE_DARK_MODE();
    },

    toggleProfile() {
      this.TOGGLE_PROFILE_MODAL();
    },
  },
  computed: {
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded", "darkMode", "profileModal"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

// Dark Mode Variables (Default)
.dark-mode {
  --bg-primary: #141625;
  --bg-secondary: #1e2139;
  --bg-tertiary: #252945;
  --bg-hover: #2e2a47;
  --text-primary: #fff;
  --text-secondary: #888eb0;
  --text-tertiary: #dfe3fa;
  --border-color: #3a3f5b;
  --input-bg: #1e2139;
}

// Light Mode Variables
.light-mode {
  --bg-primary: #f8f8fb;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f5f5f9;
  --bg-hover: #eeeff9;
  --text-primary: #0c0e16;
  --text-secondary: #7e88c3;
  --text-tertiary: #252945;
  --border-color: #dfe3fa;
  --input-bg: #ffffff;
}

.theme-toggle-btn {
  position: fixed;
  top: 20px;
  right: 80px;
  z-index: 1000;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  img {
    width: 22px;
    height: 22px;
    filter: brightness(0.8);
    transition: filter 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    
    img {
      filter: brightness(1.2);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 900px) {
    top: 30px;
    right: 90px;
  }
}

.profile-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .profile-icon {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  @media (min-width: 900px) {
    top: 30px;
    right: 30px;
  }
}

// animated profile

.profile-enter-active,
.profile-leave-active {
  transition: 0.5s ease all;
}

.profile-enter-from,
.profile-leave-to {
  transform: translateX(100%);
}

.profile-enter-active .profile-content,
.profile-leave-active .profile-content {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-enter-from .profile-content,
.profile-leave-to .profile-content {
  transform: translateX(100%);
}

.app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-direction: column;
  
  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
    
    @media (max-width: 768px) {
      padding: 0 16px;
    }
    
    @media (max-width: 480px) {
      padding: 0 12px;
    }
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;

  p {
    margin-top: 16px;
  }
}

// animated invoice

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>

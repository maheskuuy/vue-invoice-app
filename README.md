# 🧾 Vue Invoice App

A modern, feature-rich invoice management application built with Vue 3, Firebase, and responsive design. Create, manage, and print professional invoices with barcode generation, dark/light mode, and mobile support.

## ✨ Features

### 🎨 UI/UX
- **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Modern Design** - Clean interface with smooth transitions and animations
- **Print Support** - Professional print layout for invoices with barcode

### 📊 Invoice Management
- **CRUD Operations** - Create, Read, Update, Delete invoices
- **Status Tracking** - Draft, Pending, and Paid status management
- **Item List Management** - Dynamic invoice items with automatic total calculation
- **Barcode Generation** - CODE128 barcode for each invoice using jsbarcode
- **PDF Export** - Print to PDF functionality for all devices

### 👤 Profile System
- **User Profile** - Store company information (name, address, city, zip, country)
- **Auto-fill** - Automatic "Bill From" population from profile
- **Profile Modal** - Easy-to-use side panel for profile editing

### 🔥 Firebase Integration
- **Firestore Database** - Real-time data synchronization
- **Firebase Hosting** - Fast and secure deployment
- **Cloud Storage** - Persistent invoice and barcode storage

## 🚀 Live Demo

**Live App:** [https://invoice-app-38ed4.web.app](https://invoice-app-38ed4.web.app)

## 📸 Screenshots

| Light Mode | Dark Mode | Mobile View |
|------------|-----------|-------------|
| ![Light](docs/light-mode.png) | ![Dark](docs/dark-mode.png) | ![Mobile](docs/mobile.png) |

## 🛠️ Tech Stack

- **Frontend:** Vue 3, Vuex, Vue Router
- **Styling:** SCSS, CSS Variables
- **Backend:** Firebase Firestore
- **Hosting:** Firebase Hosting
- **Libraries:**
  - `jsbarcode` - Barcode generation
  - `uid` - Unique ID generation
  - `firebase` - Database & hosting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Clone & Install

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/vue-invoice-app.git
cd vue-invoice-app

# Install dependencies
npm install
```

### Environment Setup

1. Create `.env.local` file in root directory:
```env
VUE_APP_API_KEY=your_firebase_api_key
VUE_APP_AUTH_DOMAIN=your_project.firebaseapp.com
VUE_APP_PROJECT_ID=your_project_id
VUE_APP_STORAGE_BUCKET=your_project.appspot.com
VUE_APP_MESSAGING_SENDER_ID=your_sender_id
VUE_APP_APP_ID=your_app_id
```

2. Update Firebase config in `src/firebase/firebaseInit.js`

### Development

```bash
# Run development server
npm run serve

# App will run on http://localhost:8080
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npx serve -s dist
```

## 🔥 Firebase Deployment

### Initial Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase (select Hosting + Firestore)
firebase init

# Select your project
# Choose 'dist' as public directory
# Configure as single-page app: Yes
```

### Deploy

```bash
# Build and deploy
npm run build
firebase deploy

# Deploy hosting only
firebase deploy --only hosting

# Deploy Firestore rules only
firebase deploy --only firestore
```

## 📱 Features Guide

### Creating an Invoice

1. Click **"New Invoice"** button
2. Fill in Bill From (or use **"Edit Profile"** to auto-fill)
3. Fill in Bill To information
4. Add invoice items with quantity and price
5. Select payment terms (Net 30 or 60 days)
6. Click **"Save & Send"** or **"Save Draft"**

### Barcode Generation

- Barcode is automatically generated when invoice is created
- Uses CODE128 format for maximum compatibility
- Displays in invoice details and print view

### Dark/Light Mode

- Toggle using the **moon icon** (top-right)
- Preference saved in localStorage
- Smooth color transitions

### Print Receipt

1. Open invoice details
2. Click **"Print Receipt"**
3. Choose "Save as PDF" or print directly
4. Barcode and all details included

### Mobile Usage

- Fully responsive on all screen sizes
- Touch-friendly interface
- Mobile print support (Save to PDF)

## 📂 Project Structure

```
vue-invoice-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Images and icons
│   ├── components/
│   │   ├── Invoice.vue          # Invoice list item
│   │   ├── InvoiceModal.vue     # Create/edit invoice form
│   │   ├── Navigation.vue       # Top navigation bar
│   │   ├── ProfileModal.vue     # Profile editor
│   │   ├── Modal.vue            # Confirmation modal
│   │   └── Loading.vue          # Loading spinner
│   ├── firebase/
│   │   └── firebaseInit.js      # Firebase configuration
│   ├── router/
│   │   └── index.js             # Vue Router setup
│   ├── store/
│   │   └── index.js             # Vuex store
│   ├── views/
│   │   ├── Home.vue             # Invoice list page
│   │   └── InvoiceView.vue      # Invoice detail page
│   ├── App.vue                  # Root component
│   └── main.js                  # App entry point
├── firebase.json                # Firebase config
├── firestore.rules             # Firestore security rules
├── .env.local                  # Environment variables
└── package.json
```

## 🎨 Theming

The app uses CSS variables for theming. Customize colors in `src/App.vue`:

```scss
// Dark Mode
.dark-mode {
  --bg-primary: #141625;
  --bg-secondary: #1e2139;
  --text-primary: #fff;
  // ... more variables
}

// Light Mode
.light-mode {
  --bg-primary: #f8f8fb;
  --bg-secondary: #ffffff;
  --text-primary: #0c0e16;
  // ... more variables
}
```

## 🔒 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invoices/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** Update rules for production with proper authentication.

## 🐛 Troubleshooting

### Barcode not generating
- Ensure `jsbarcode` is installed: `npm install jsbarcode`
- Check browser console for errors
- Try creating a new invoice

### Firebase deployment fails
- Verify Firebase CLI is installed: `npm install -g firebase-tools`
- Check Firebase project is selected: `firebase use --add`
- Ensure correct credentials in `.env.local`

### Mobile print not working
- Use "Save as PDF" option on mobile browsers
- Try Chrome or Safari for best compatibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Live Demo: [invoice-app-38ed4.web.app](https://invoice-app-38ed4.web.app)

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Firebase for backend infrastructure
- jsbarcode library for barcode generation
- Original template inspiration

## 📧 Support

For support, email your.email@example.com or open an issue in the repository.

---

⭐ **Star this repo** if you find it helpful!

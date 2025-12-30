# Barcode Generation Feature

## Overview
Your Vue Invoice App now includes automatic barcode generation for invoices. When a new invoice is created, a unique barcode (CODE128 format) is automatically generated based on the invoice ID.

## Features
✨ **Automatic Barcode Generation** - Generated when invoice is created
✨ **CODE128 Format** - Industry standard barcode format
✨ **Display in Form** - Shows preview while creating invoice
✨ **Display in Invoice Detail** - Shows barcode when viewing invoice
✨ **Persistent Storage** - Barcode SVG stored in Firestore database

## How It Works

### 1. Installation
jsbarcode library has been installed via npm:
```bash
npm install jsbarcode
```

### 2. Barcode Generation
When you click "Create Invoice":
- The system generates a unique 6-character invoice ID
- A CODE128 barcode is created from this ID
- The barcode SVG is stored in the database along with the invoice

### 3. Barcode Display

**In Form (InvoiceModal.vue):**
- Shows placeholder text "Barcode will be generated when invoice is created"
- Updates when invoice is successfully created

**In Invoice Details (InvoiceView.vue):**
- Displays the barcode below the invoice ID and description
- Shows the barcode with readable numbers below it

## Technical Details

### Dependencies
- `jsbarcode` - Barcode generation library

### File Changes
- `src/components/InvoiceModal.vue`
  - Added barcode section in form
  - Added generateBarcode() method
  - Barcode stored in invoiceBarcode data property
  - Barcode saved to Firestore

- `src/views/InvoiceView.vue`
  - Added barcode display section
  - Shows barcode SVG from database

### Database Structure
Each invoice now includes:
```javascript
invoiceBarcode: "<svg>...</svg>" // Barcode as SVG string
```

## Features & Usage

### Creating an Invoice
1. Fill in all invoice details
2. Click "Create Invoice"
3. Barcode is automatically generated from the invoice ID
4. Barcode is saved with the invoice in the database

### Viewing an Invoice
1. Navigate to invoice details view
2. Barcode appears below the invoice ID
3. Shows both visual barcode and readable numbers

## Barcode Properties
- **Format**: CODE128 (compatible with most barcode scanners)
- **Width**: 2px per unit
- **Height**: 100px
- **Display Value**: Yes (shows numbers below barcode)
- **Color**: Black on white background

## Logo Adjustment
The invoice app logo has also been adjusted:
- Moved slightly higher (top margin adjustment)
- Better vertical positioning in the navigation header
- Maintains responsive design on mobile and desktop

---

**Note**: Barcodes are automatically generated when invoices are created and cannot be manually edited. Each unique invoice ID generates a unique barcode.

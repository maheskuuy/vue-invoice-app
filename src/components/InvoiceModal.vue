<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading" />
      <h1 v-if="!editInvoice">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <div class="flex" style="justify-content: space-between; align-items: center;">
          <h4>Bill From</h4>
          <button type="button" @click="openProfile" class="edit-profile-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Edit Profile
          </button>
        </div>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription" />
        </div>
        <div class="barcode-section flex flex-column">
          <h3>Invoice Barcode</h3>
          <div class="barcode-display flex flex-column">
            <p class="barcode-info">Barcode will be generated when invoice is created</p>
          </div>
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Toal</th>
            </tr>
            <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total flex">${{ (item.total = item.qty * item.price) }}</td>
              <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt="" />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!editInvoice" type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
          <button v-if="!editInvoice" type="submit" @click="publishInvoice" class="purple">Create Invoice</button>
          <button v-if="editInvoice" type="sumbit" class="purple">Update Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
import JsBarcode from "jsbarcode";

export default {
  name: "invoiceModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
      invoiceBarcode: null,
    };
  },
  components: {
    Loading,
  },
  created() {
    // get current date for invoice date field
    if (!this.editInvoice) {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString("en-us", this.dateOptions);
      
      // Auto-fill Bill From section from user profile
      if (this.userProfile) {
        this.billerStreetAddress = this.userProfile.streetAddress || null;
        this.billerCity = this.userProfile.city || null;
        this.billerZipCode = this.userProfile.zipCode || null;
        this.billerCountry = this.userProfile.country || null;
      }
    }

    if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_MODAL", "TOGGLE_EDIT_INVOICE", "TOGGLE_PROFILE_MODAL"]),

    ...mapActions(["UPDATE_INVOICE", "GET_INVOICES"]),

    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeInvoice() {
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },

    openProfile() {
      this.TOGGLE_PROFILE_MODAL();
    },

    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter((item) => item.id !== id);
    },

    calInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },

    publishInvoice() {
      this.invoicePending = true;
    },

    saveDraft() {
      this.invoiceDraft = true;
    },

    generateBarcode(invoiceId) {
      return new Promise((resolve) => {
        // Create container for barcode
        const container = document.createElement("div");
        container.id = "barcodeContainer";
        container.style.display = "none";
        document.body.appendChild(container);
        
        // Create SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        container.appendChild(svgElement);
        
        // Generate barcode with timeout to ensure render
        setTimeout(() => {
          JsBarcode(svgElement, invoiceId, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true,
            lineColor: "#000000",
            margin: 5,
          });
          
          // Get complete SVG HTML including all rendered elements
          const barcodeHTML = container.innerHTML;
          this.invoiceBarcode = barcodeHTML;
          
          // Clean up
          document.body.removeChild(container);
          resolve();
        }, 100);
      });
    },

    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const invoiceId = uid(6);
      
      // Generate barcode and wait for it to complete
      await this.generateBarcode(invoiceId);

      const dataBase = db.collection("invoices").doc();

      await dataBase.set({
        invoiceId: invoiceId,
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
        invoiceBarcode: this.invoiceBarcode,
      });

      this.loading = false;

      this.TOGGLE_INVOICE();

      this.GET_INVOICES();
    },

    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = db.collection("invoices").doc(this.docId);

      await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      };

      this.UPDATE_INVOICE(data);
    },

    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(["editInvoice", "currentInvoiceArray", "userProfile"]),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 48px;
    max-width: 700px;
    width: 100%;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s ease, color 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;

    @media (max-width: 768px) {
      padding: 32px;
      max-width: 100%;
      max-height: 95vh;
    }

    @media (max-width: 480px) {
      padding: 16px;
      max-height: 100vh;
    }

    h1 {
      margin-bottom: 32px;
      color: var(--text-primary);
      font-size: 24px;

      @media (max-width: 480px) {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }

    h3 {
      margin-bottom: 12px;
      font-size: 16px;
      color: var(--text-secondary);

      @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 16px;

      @media (max-width: 480px) {
        margin-bottom: 12px;
      }
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 28px;

      @media (max-width: 768px) {
        margin-bottom: 20px;
      }

      @media (max-width: 480px) {
        margin-bottom: 16px;
      }

      .edit-profile-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        color: #7c5dfa;
        font-size: 12px;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: var(--bg-hover);
        }

        svg {
          width: 14px;
          height: 14px;
        }
      }

      .location-details {
        gap: 12px;
        flex-wrap: wrap;

        @media (max-width: 480px) {
          flex-direction: column;
          gap: 16px;
        }

        div {
          flex: 1;
          min-width: 120px;

          @media (max-width: 480px) {
            min-width: 100%;
          }
        }
      }
    }

    // Invoice Work
    .invoice-work {
      margin-bottom: 28px;

      .payment {
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;

        @media (max-width: 480px) {
          flex-direction: column;
        }

        div {
          flex: 1;
          min-width: 140px;

          @media (max-width: 480px) {
            min-width: 100%;
          }
        }
      }

      .barcode-section {
        margin: 16px 0;
        padding: 12px;
        border-radius: 6px;
        background-color: var(--bg-tertiary);
        transition: background-color 0.3s ease;
        display: none;

        h3 {
          margin-bottom: 10px;
          font-size: 13px;
        }

        .barcode-display {
          align-items: center;
          padding: 12px;
          background-color: var(--input-bg);
          border-radius: 6px;
          border: 1px solid var(--border-color);
          transition: background-color 0.3s ease, border-color 0.3s ease;
          overflow-x: auto;
          min-height: 50px;

          .barcode-info {
            font-size: 11px;
            color: var(--text-secondary);
            text-align: center;
            font-style: italic;
          }
        }
      }

      .work-items {
        h3 {
          margin-bottom: 12px;

          @media (max-width: 480px) {
            margin-bottom: 10px;
          }
        }

        .item-list {
          width: 100%;
          overflow-x: auto;
          margin-bottom: 12px;

          .table-heading,
          .table-items {
            gap: 8px;
            font-size: 11px;
            margin-bottom: 8px;

            @media (max-width: 480px) {
              gap: 6px;
              font-size: 10px;
            }

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 15%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 15%;
              align-self: center;
            }
          }

          .table-heading {
            th {
              text-align: left;
              font-size: 10px;
              color: var(--text-secondary);
            }
          }

          .table-items {
            position: relative;

            input {
              width: 100%;
              padding: 6px !important;
              font-size: 11px !important;

              @media (max-width: 480px) {
                padding: 5px !important;
                font-size: 10px !important;
              }
            }

            .total {
              font-weight: 600;
              font-size: 11px;
            }

            img {
              position: absolute;
              top: 6px;
              right: 0;
              width: 12px;
              height: 16px;
              cursor: pointer;
            }
          }
        }

        .button {
          color: var(--text-primary);
          background-color: var(--bg-tertiary);
          align-items: center;
          justify-content: center;
          width: 100%;
          transition: background-color 0.3s ease, color 0.3s ease;
          padding: 10px !important;
          margin: 12px 0 !important;
          font-size: 12px;

          @media (max-width: 480px) {
            padding: 8px !important;
            margin: 10px 0 !important;
            font-size: 11px;
          }

          img {
            margin-right: 4px;
            width: 10px;
          }
        }
      }
    }

    .save {
      margin-top: 40px;
      gap: 10px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        margin-top: 28px;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        margin-top: 20px;
        gap: 8px;
      }

      div {
        flex: 1;
        min-width: 120px;

        @media (max-width: 480px) {
          min-width: 100%;
        }
      }

      .right {
        justify-content: flex-end;
        gap: 8px;

        @media (max-width: 480px) {
          justify-content: stretch;
          flex-direction: column;
          gap: 8px;
        }
      }
    }
  }

  .input {
    margin-bottom: 14px;

    @media (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  label {
    font-size: 12px;
    margin-bottom: 5px;
    display: block;

    @media (max-width: 480px) {
      font-size: 11px;
      margin-bottom: 4px;
    }
  }

  input,
  select {
    width: 100%;
    background-color: var(--input-bg);
    color: var(--text-primary);
    border-radius: 4px;
    padding: 10px 4px;
    border: 1px solid var(--border-color);
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    font-size: 13px;

    @media (max-width: 480px) {
      padding: 8px 4px;
      font-size: 12px;
    }

    &:focus {
      outline: none;
      border-color: #7c5dfa;
    }
  }
}
</style>

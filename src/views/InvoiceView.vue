<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="printReceipt" class="purple">Print Receipt</button>
        <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="red">Delete</button>
        <button @click="updateStatusToPaid(currentInvoice.docId)" v-if="currentInvoice.invoicePending" class="green">
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="barcode-section flex flex-column" v-if="currentInvoice.invoiceBarcode">
        <h4>Invoice Barcode</h4>
        <div class="barcode-display flex" v-html="currentInvoice.invoiceBarcode"></div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
    };
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE", "TOGGLE_EDIT_INVOICE", "TOGGLE_INVOICE"]),

    ...mapActions(["DELETE_INVOICE", "UPDATE_STATUS_TO_PENDING", "UPDATE_STATUS_TO_PAID"]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },

    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },

    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);
      this.$router.push({ name: "Home" });
    },

    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },

    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },

    printReceipt() {
      window.print();
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray", "editInvoice"]),
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: var(--text-primary);
    font-size: 12px;
    transition: color 0.3s ease;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: var(--bg-secondary);
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    @media (max-width: 480px) {
      padding: 12px;
    }

    .left {
      align-items: center;
      
      @media (max-width: 768px) {
        width: 100%;
      }

      span {
        color: var(--text-secondary);
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
      
      @media (max-width: 768px) {
        width: 100%;
        justify-content: stretch;
        flex-direction: column;
      }

      button {
        color: #fff;
        
        @media (max-width: 768px) {
          flex: 1;
          min-width: 120px;
        }
        
        @media (max-width: 480px) {
          min-width: 100%;
        }
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;
    
    @media (max-width: 768px) {
      padding: 32px;
    }
    
    @media (max-width: 480px) {
      padding: 16px;
    }

    .top {
      flex-direction: column;
      gap: 24px;
      
      @media (max-width: 768px) {
        gap: 16px;
      }
      
      div {
        color: var(--text-secondary);
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 8px;
          
          @media (max-width: 480px) {
            font-size: 18px;
          }
        }

        p:nth-child(2) {
          font-size: 16px;
          
          @media (max-width: 480px) {
            font-size: 14px;
          }
        }

        span {
          color: var(--text-secondary);
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-start;
        
        @media (max-width: 768px) {
          align-items: flex-start;
        }
      }
    }

    .barcode-section {
      margin: 24px 0;
      padding: 16px;
      background-color: var(--bg-tertiary);
      border-radius: 8px;
      transition: background-color 0.3s ease;
      overflow-x: auto;
      
      @media (max-width: 768px) {
        padding: 12px;
        margin: 16px 0;
      }

      h4 {
        color: var(--text-secondary);
        font-size: 12px;
        margin-bottom: 12px;
      }

      .barcode-display {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        background-color: var(--input-bg);
        border-radius: 8px;
        border: 1px solid var(--border-color);
        transition: background-color 0.3s ease, border-color 0.3s ease;
        overflow-x: auto;
      }
    }

    .middle {
      margin-top: 50px;
      color: var(--text-secondary);
      gap: 16px;
      transition: color 0.3s ease;
      flex-wrap: wrap;
      
      @media (max-width: 768px) {
        margin-top: 32px;
        gap: 12px;
      }
      
      @media (max-width: 480px) {
        flex-direction: column;
        margin-top: 24px;
      }

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
        
        @media (max-width: 480px) {
          font-size: 14px;
        }
      }

      .bill,
      .payment {
        flex: 1;
        min-width: 200px;
        
        @media (max-width: 480px) {
          min-width: 100%;
        }
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
        
        @media (max-width: 480px) {
          flex: 1;
          min-width: 100%;
        }
      }
    }

    .bottom {
      margin-top: 50px;
      
      @media (max-width: 768px) {
        margin-top: 32px;
      }
      
      @media (max-width: 480px) {
        margin-top: 24px;
      }

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: var(--bg-tertiary);
        transition: background-color 0.3s ease;
        overflow-x: auto;
        
        @media (max-width: 768px) {
          padding: 16px;
        }
        
        @media (max-width: 480px) {
          padding: 12px;
        }

        .heading {
          color: var(--text-secondary);
          font-size: 12px;
          margin-bottom: 32px;
          
          @media (max-width: 480px) {
            font-size: 11px;
            margin-bottom: 16px;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: var(--text-primary);
          transition: color 0.3s ease;
          
          @media (max-width: 480px) {
            font-size: 12px;
            margin-bottom: 16px;
          }

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: var(--text-primary);
        padding: 32px;
        background-color: var(--bg-tertiary);
        align-items: center;
        border-radius: 0 0 20px 20px;
        transition: background-color 0.3s ease, color 0.3s ease;
        
        @media (max-width: 768px) {
          padding: 16px;
        }
        
        @media (max-width: 480px) {
          padding: 12px;
          flex-direction: column;
          align-items: flex-start;
        }

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
          
          @media (max-width: 480px) {
            font-size: 20px;
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
}

/* Print Styles */
@media print {
  * {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  body, html {
    height: auto !important;
  }

  .theme-toggle-btn,
  .profile-btn {
    display: none !important;
  }
  
  .invoice-view {
    .nav-link,
    .header {
      display: none !important;
    }

    .invoice-details {
      box-shadow: none !important;
      border: none !important;
      padding: 20px !important;
      margin: 0 !important;
      page-break-inside: avoid;
      background-color: white !important;
      color: black !important;
    }

    button {
      display: none !important;
    }

    .barcode-section {
      display: block !important;
      page-break-inside: avoid;
      padding: 0 !important;
      margin: 20px 0 !important;
      background-color: white !important;
      
      h4 {
        color: black !important;
        display: none !important;
      }
      
      .barcode-display {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 20px 0 !important;
        page-break-inside: avoid;
        background-color: white !important;
        padding: 0 !important;
        border: none !important;
        
        svg {
          display: block !important;
          max-width: 100% !important;
          height: auto !important;
          width: 300px !important;
        }
      }
    }
    
    .bottom {
      page-break-inside: avoid;
    }
  }
}
</style>

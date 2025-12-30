<template>
  <router-link class="invoice flex" :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "invoice",
  props: ["invoice"],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: var(--text-primary);
  border-radius: 20px;
  padding: 28px 32px;
  background-color: var(--bg-secondary);
  align-items: center;
  border: 1px solid var(--border-color);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
    flex-direction: column;
  }

  span {
    font-size: 13px;
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    
    @media (max-width: 768px) {
      gap: 12px;
    }
    
    @media (max-width: 480px) {
      flex-basis: 100%;
      gap: 12px;
      justify-content: space-between;
      width: 100%;
    }

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    
    @media (max-width: 768px) {
      gap: 12px;
    }
    
    @media (max-width: 480px) {
      flex-basis: 100%;
      width: 100%;
      justify-content: space-between;
    }

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
      
      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
  }
}
</style>

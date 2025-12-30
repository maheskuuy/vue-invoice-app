<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: var(--bg-secondary);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
  
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    padding: 0;
    border-bottom: none;
    border-right: 1px solid var(--border-color);
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    margin-top: -8px;
    
    @media (max-width: 768px) {
      padding: 16px;
      margin-top: 0;
      border-radius: 10px;
    }
    
    @media (max-width: 480px) {
      padding: 12px;
    }
    
    @media (min-width: 900px) {
      width: 100%;
      border-radius: 0 20px 20px 0;
      margin-top: 10px;
    }

    img {
      width: auto;
      height: 30px;
      
      @media (max-width: 480px) {
        height: 24px;
      }
    }
  }
}
</style>

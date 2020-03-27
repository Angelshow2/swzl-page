<template>
  <div class="baseinfo-container">
    <div class="title">基本信息</div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">个人账号:  </label>
      <div>llj981055641</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属学院:  </label>
      <div>电子与信息工程学院</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属专业:  </label>
      <div>计算机科学与技术</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属班级:  </label>
      <div>1602</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">用户姓名:  </label>
      <div>李林杰</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">用户学号:  </label>
      <div>2016013879</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .baseinfo-container {
    background-color: #fff;
    height: 768px;
    border-radius: 4px;
    padding: 20px 40px;
    box-shadow: 0 2px 15px 0 rgba(0,0,0,0.08);

    .title {
      font-size: 20px;
      color: #0066ff;
      line-height: 65px;
      border-bottom: 1px dashed #0066ff;
      margin-bottom: 50px;
      text-align: center;
    }

    .item {
      display: flex;
      color: #4a4a4a;
      margin: auto;
      margin-bottom: 20px;
      width: 25%;
      // padding-left: 100px;
    }
  }

  
</style>
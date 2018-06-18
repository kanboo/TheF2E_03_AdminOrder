<template>
  <div class="main index">
    <div class="container">

      <section class="header">
        <h2>OVERVIEW</h2>
        <div class="dateInfo">
          2018/6/6 > 2018/6/6 Weekly
        </div>
      </section>

      <section class="row tileCounts">
        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-money-bill-alt"></i>
            TOTAL REVENUE
          </p>
          <div class="number green">8,150</div>
        </div>

        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-money-bill-alt"></i>
            TOTAL COST
          </p>
          <div class="number green">12,660</div>
        </div>

        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-money-bill-alt"></i>
            NET INCOME
          </p>
          <div class="number green">41,880</div>
        </div>
      </section>

      <section class="row graph">

          <h2 class="title">Activity</h2>

          <div class="chart">
            <ve-line :data="chartData"
              :settings="chartSettings"
              :extend="chartExtend">
            </ve-line>
          </div>
      </section>

      <section class="row otherInfo">
        <div class="websiteList">
          <h2 class="title">Transaction Website</h2>
          <ul class="rankingInfo">
            <li class="rankingItem" v-for="(item, index) in 4" :key="index">
              <span class="icon">
                <i class="fab fa-facebook-square"></i>
              </span>
              <span class="companyName">
                Facebook
              </span>
              <span class="price">
                45864
              </span>
              <span class="ranking up">
                <i class="fas fa-arrow-up"></i>
                20%
              </span>
            </li>
          </ul>

        </div>

        <div class="orderList">
          <h2 class="title">Latest Orders</h2>
          <ul class="orderInfor">
            <li class="orderItem" v-for="(item, index) in 3" :key="index">

              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">

              <div class="orderContent">
                <h3 class="subtitle2">Vintage T-shirt</h3>


                  <div class="row">
                    <span class="icon">
                      <i class="fab fa-facebook-square"></i>
                      2018/6/13 13:42
                    </span>
                    <span class="total">Total</span>
                  </div>
                  <div class="row">
                    <span class="icon">
                      <i class="fab fa-facebook-square"></i>
                      2018/6/13 13:42
                    </span>
                    <span class="price">3200</span>
                  </div>


              </div>

            </li>
          </ul>

        </div>
      </section>

    </div>

    <div is='IndexFooter'></div>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import IndexFooter from './IndexFooter';

export default {
  name: 'Index',
  components: {
    FontAwesomeIcon,
    IndexFooter
  },
  data() {
    this.chartSettings = {
      metrics: ['访问用户', '下单用户'],
      dimension: ['日期']
    };
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      // chartSettings: {},
      chartExtend: {
        series: {
          smooth: false
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

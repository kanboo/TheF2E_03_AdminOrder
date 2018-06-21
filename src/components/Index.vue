<template>
  <div class="main index">
    <div class="container">

      <section class="header">
        <h2>OVERVIEW</h2>
        <div class="dateInfo">
          <span class="date_start"> 2018/6/6 </span>
          <span> >  </span>
          <span class="date_end"> 2018/6/11 </span>

          <el-dropdown class="daterange"
            placement="bottom-start"
            trigger="hover"
            @command="handleDaterange">
            <span class="el-dropdown-link">
              {{ daterangeSelect.label}}
              <i class="fas fa-caret-down"></i>
            </span>
            <el-dropdown-menu
              slot="dropdown"
              class="daterange-dropdown-menu">
              <el-dropdown-item
                :command="item"
                v-for="item in daterangeOptions" :key="item.value">
                {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </section>

      <section class="row tileCounts">
        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-hand-holding-usd"></i>
            TOTAL REVENUE
          </p>
          <div class="number green">
            {{ getTotalRevenue.toLocaleString('en-US') }}
          </div>
        </div>

        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-th-large"></i>
            TOTAL COST
          </p>
          <div class="number red">
            {{ totalCost.toLocaleString('en-US') }}
          </div>
        </div>

        <div class="tileCount">
          <p class="subtitle2">
            <i class="fas fa-money-bill-alt"></i>
            NET INCOME
          </p>
          <div class="number blue">
            {{ netIncome.toLocaleString('en-US') }}
          </div>
        </div>
      </section>

      <section class="row graph">

          <h2 class="title">Activity</h2>

          <div class="chart">
            <ve-line :data="chartData"
              :settings="chartSettings"
              :extend="chartExtend"
              :legend-visible="false"
              height="380px">
            </ve-line>
          </div>
      </section>

      <section class="row otherInfo">
        <div class="websiteList">
          <h2 class="title">Transaction Website</h2>
          <ul class="rankingInfo">
            <li class="rankingItem" v-for="item in websitesData.slice(0,4)" :key="item.name">
              <span class="icon">
                <i :class="item.faIcon"></i>
              </span>
              <span class="name">
                {{item.url}}
              </span>
              <span class="price">
                {{item.price.toLocaleString('en-US')}}
              </span>
              <span class="ranking" :class="item.type">
                <i class="fas fa-arrow-up" v-if="item.type==='up'"></i>
                <i class="fas fa-arrow-down" v-if="item.type==='down'"></i>
                {{ item.percent + '%' }}

                <div class="tip">
                  <span>
                    INCREASE
                    <span class="num" :class="item.type">
                      {{ item.increase.toLocaleString('en-US') }}
                    </span>
                    VIEWS
                  </span>
                  <small>
                    last week: {{ item.lastweekIncrease.toLocaleString('en-US') }}
                  </small>
                </div>
              </span>
            </li>
          </ul>

        </div>

        <div class="orderList">
          <h2 class="title">Latest Orders</h2>
          <ul class="orderInfo">
            <li class="orderItem" v-for="item in orderData.slice(0,3)" :key="item.bougter">

              <div class="imgBox" :style="{backgroundImage: `url(${item.imgUrl})`}">
              </div>

              <div class="orderContent">
                <h3 class="subtitle2">{{item.name}}</h3>

                <div class="row">
                  <span class="icon">
                    <i class="fas fa-clock"></i>
                    {{item.name}}
                  </span>
                  <span class="total">Total</span>
                </div>
                <div class="row">
                  <span class="icon">
                    <i class="fas fa-male"></i>
                    {{item.bougter}}
                  </span>
                  <span class="totalCost">
                    {{item.totalCost.toLocaleString('en-US')}}
                  </span>
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
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import IndexFooter from './IndexFooter';

export default {
  name: 'Index',
  components: {
    FontAwesomeIcon,
    IndexFooter
  },
  data() {
    return {
      daterangeSelect: {
        label: 'Daily',
        value: 'Daily'
      },
      daterangeOptions: [
        {
          label: 'Daily',
          value: 'Daily'
        },
        {
          label: 'Weekly',
          value: 'Weekly'
        },
        {
          label: 'Monthly',
          value: 'Monthly'
        },
        {
          label: 'Yearly',
          value: 'Yearly'
        },
        {
          label: 'Custom',
          value: 'Custom'
        }
      ],
      chartData: {
        columns: ['日期', '綠線', '藍線', '紅線'],
        rows: [
          { 日期: '6 JUN', 紅線: 1393, 藍線: 2093, 綠線: 7000 },
          { 日期: '7 JUN', 紅線: 3530, 藍線: 5330, 綠線: 9000 },
          { 日期: '8 JUN', 紅線: 2923, 藍線: 4623, 綠線: 7000 },
          { 日期: '9 JUN', 紅線: 1723, 藍線: 6143, 綠線: 8000 },
          { 日期: '10 JUN', 紅線: 3792, 藍線: 2492, 綠線: 7500 },
          { 日期: '11 JUN', 紅線: 4593, 藍線: 1423, 綠線: 8000 }
        ]
      },
      chartSettings: {
        metrics: ['綠線', '藍線', '紅線'],
        dimension: ['日期']
      },
      chartExtend: {
        series: {
          smooth: false
        }
      },
      websitesData: [
        {
          name: 'facebook',
          faIcon: 'fab fa-facebook-square',
          url: 'Facebook.com',
          price: 65836,
          type: 'up',
          percent: 34,
          increase: 1842,
          lastweekIncrease: 1200
        },
        {
          name: 'google',
          faIcon: 'fab fa-google',
          url: 'google.com',
          price: 55836,
          type: 'up',
          percent: 23,
          increase: 1242,
          lastweekIncrease: 900
        },
        {
          name: 'apple',
          faIcon: 'fab fa-apple',
          url: 'Apple.com',
          price: 45200,
          type: 'down',
          percent: 35,
          increase: 942,
          lastweekIncrease: 1212
        },
        {
          name: 'wordpress',
          faIcon: 'fab fa-wordpress-simple',
          url: 'Wordpress.com',
          price: 30836,
          type: 'down',
          percent: 19,
          increase: 841,
          lastweekIncrease: 1000
        },
        {
          name: 'apple',
          faIcon: 'fab fa-apple',
          url: 'Apple.com',
          price: 45200,
          type: 'down',
          percent: 35,
          increase: 1242,
          lastweekIncrease: 900
        }
      ],
      orderData: [
        {
          name: 'Vintage T-shirt',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          bougthTime: '2018/6/13  09:42',
          bougter: 'Belle Willis',
          totalCost: 3200
        },
        {
          name: 'Cowboy Jacket',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/giuliusa/128.jpg',
          bougthTime: '2018/6/13  10:45',
          bougter: 'Adrian Cummings',
          totalCost: 2800
        },
        {
          name: 'Coach Coat',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg',
          bougthTime: '2018/6/13  18:42',
          bougter: 'Lura Holland',
          totalCost: 1600
        },
        {
          name: 'Coach Coat',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg',
          bougthTime: '2018/6/13  18:42',
          bougter: 'Lura Holland',
          totalCost: 1600
        }
      ]
    };
  },
  methods: {
    handleDaterange(selectObj) {
      // console.log(command);
      this.daterangeSelect = selectObj;
    }
  },
  computed: {
    ...mapGetters(['totalCost', 'netIncome']),
    getTotalRevenue() {
      return this.totalCost + this.netIncome;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

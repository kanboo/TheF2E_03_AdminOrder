<template>
  <div class="main orders">
    <div class="container">


      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="fas fa-tag"></i>
          勾選項目<i class="fas fa-caret-down"></i>：
          {{ dropdownSelect}}
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="SelectAll">Select All</el-dropdown-item>
          <el-dropdown-item command="UnselectAll">Unselect All</el-dropdown-item>
          <el-dropdown-item command="Paid">Paid</el-dropdown-item>
          <el-dropdown-item command="Unpaid">Unpaid</el-dropdown-item>
          <el-dropdown-item command="Shipping">Shipping</el-dropdown-item>
          <el-dropdown-item command="Done">Done</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="Customer"
          width="130">
          <template slot-scope="scope">{{ scope.row.customer }}</template>
        </el-table-column>

        <el-table-column
          label="Product List"
          width="140">
          <template slot-scope="scope">
            <ul class="productList">
              <li class="item" v-for="item in scope.row.productList" :key="item.name">
                <span class="title">{{ item.name }}</span>
                <div class="info">
                  <span class="price">
                    {{ '$' + item.price.toLocaleString('en-US') }}
                  </span>
                  <span class="count">{{ item.count }}</span>
                </div>
              </li>
            </ul>


          </template>
        </el-table-column>

        <el-table-column
          label="Total"
          width="100"
          >
          <template slot-scope="scope"
          >
          {{ '$'+ scope.row.total.toLocaleString('en-US') }}
          </template>
        </el-table-column>

        <el-table-column
          label="Add to Cart"
          width="120">
          <template slot-scope="scope">{{ scope.row.addTime }}</template>
        </el-table-column>

        <el-table-column
          label="Check-out"
          width="120">
          <template slot-scope="scope">{{ scope.row.checkOut }}</template>
        </el-table-column>

        <!-- <el-table-column
          label="address"
          width="120">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>

        <el-table-column
          label="Phone"
          width="120">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>

        <el-table-column
          label="Email"
          width="120">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column> -->

        <el-table-column
          label="Status"
          width="180">
          <template slot-scope="scope">
            <!-- {{ scope.row.status }} -->

            <el-dropdown size="small" split-button type="primary">
            {{ scope.row.status }}
            <el-dropdown-menu slot="dropdown" v-model="scope.row.status">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      tableData: [
        {
          orderID: 'T0001',
          customer: 'Ian Medina',
          productList: [
            { name: 'Vestibulum.', price: 1000, count: 10 },
            { name: 'Curabitur lo.', price: 2000, count: 10 },
            { name: 'Nam porttito.', price: 3000, count: 10 }
          ],
          total: 1000,
          addTime: '2018/6/8 13:39',
          checkOut: '2018/6/8 13:39',
          address: '386 Windler Drives',
          phone: '0912345678',
          email: 'boss@gmail.com',
          status: 'DONE'
        },
        {
          orderID: 'T0002',
          customer: 'Manuel Stephens',
          productList: [{ name: 'Vestibulum.', price: 1000, count: 10 }],
          total: 1000,
          addTime: '2018/6/8 13:39',
          checkOut: '2018/6/8 13:39',
          address: '386 Windler Drives',
          phone: '0912345678',
          email: 'boss@gmail.com',
          status: 'DONE'
        },
        {
          orderID: 'T0003',
          customer: 'Daisy Reynolds',
          productList: [
            { name: 'Vestibulum.', price: 1000, count: 10 },
            { name: 'Curabitur lo', price: 2000, count: 10 },
            { name: 'Nam porttito.', price: 3000, count: 10 },
            { name: 'Donec facili.', price: 2000, count: 10 }
          ],
          total: 1000,
          addTime: '2018/6/8 13:39',
          checkOut: '2018/6/8 13:39',
          address: '386 Windler Drives',
          phone: '0912345678',
          email: 'boss@gmail.com',
          status: 'PAID'
        }
      ],
      dropdownSelect: '',
      multipleSelection: []
    };
  },
  methods: {
    handleCommand(command) {
      // console.log(command);
      this.dropdownSelect = command;

      switch (command.toUpperCase()) {
        case 'SelectAll'.toUpperCase():
          this.tableData.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
          break;
        case 'UnselectAll'.toUpperCase():
          this.dropdownSelect = ''; // 清空
          this.$refs.multipleTable.clearSelection();
          break;
        default:
          this.tableData.forEach(item => {
            if (item.status.toUpperCase() === command.toUpperCase()) {
              this.$refs.multipleTable.toggleRowSelection(item, true);
            } else {
              this.$refs.multipleTable.toggleRowSelection(item, false);
            }
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

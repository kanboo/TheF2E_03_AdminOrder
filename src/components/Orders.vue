<template>
  <div class="main orders">
    <div class="container">

      <div class="selectBox">
        <el-dropdown class="tagSelect" trigger="click" @command="handleTag">
          <span class="el-dropdown-link">
            <i class="fas fa-tag"></i>
            勾選項目<i class="fas fa-caret-down"></i>：
            {{ tagSelect.label}}
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item
              :command="item"
              v-for="item in tagOptions" :key="item.value">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-popover
          placement="bottom"
          width="130px"
          trigger="click">
          <el-checkbox-group v-model="editSectionSelect" class="editSection">
            <el-checkbox :label="item"
            v-for="item in editSectionOptions" :key="item">
            </el-checkbox>
          </el-checkbox-group>
          <el-button slot="reference">click 激活</el-button>
        </el-popover>

      </div>

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
          label="Order ID"
          width="80"
          v-if="isSectionSelect('Order ID')">
          <template slot-scope="scope">{{ scope.row.orderID }}</template>
        </el-table-column>

        <el-table-column
          label="Customer"
          width="130"
          v-if="isSectionSelect('Customer')">
          <template slot-scope="scope">{{ scope.row.customer }}</template>
        </el-table-column>

        <el-table-column
          label="Product List"
          width="160"
          v-if="isSectionSelect('Product List')">
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
          v-if="isSectionSelect('Total')">
          <template slot-scope="scope"
          >
          {{ '$'+ scope.row.total.toLocaleString('en-US') }}
          </template>
        </el-table-column>

        <el-table-column
          label="Add to Cart"
          width="120"
          v-if="isSectionSelect('Add to Cart')">
          <template slot-scope="scope">{{ scope.row.addTime }}</template>
        </el-table-column>

        <el-table-column
          label="Check-out"
          width="120"
          v-if="isSectionSelect('Check-out')">
          <template slot-scope="scope">{{ scope.row.checkOut }}</template>
        </el-table-column>

        <el-table-column
          label="Address"
          width="120"
          v-if="isSectionSelect('Address')">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>

        <el-table-column
          label="Phone"
          width="120"
          v-if="isSectionSelect('Phone')">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>

        <el-table-column
          label="Email"
          width="120"
          v-if="isSectionSelect('Email')">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>

        <el-table-column
          label="Status"
          width="120"
          v-if="isSectionSelect('Status')">
          <template slot-scope="scope">
            <el-select v-model="scope.row.status" class="statusSelect">
              <el-option v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          status: 'Unpaid'
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
          status: 'Done'
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
          status: 'Paid'
        }
      ],
      tagOptions: [
        {
          label: 'Select All',
          value: 'SelectAll'
        },
        {
          label: 'Unselect All',
          value: 'UnselectAll'
        },
        {
          label: 'Paid',
          value: 'Paid'
        },
        {
          label: 'Unpaid',
          value: 'Unpaid'
        },
        {
          label: 'Shipping',
          value: 'Shipping'
        },
        {
          label: 'Done',
          value: 'Done'
        }
      ],
      tagSelect: {},
      multipleSelection: [],
      statusOptions: [
        {
          label: 'Paid',
          value: 'Paid'
        },
        {
          label: 'Unpaid',
          value: 'Unpaid'
        },
        {
          label: 'Shipping',
          value: 'Shipping'
        },
        {
          label: 'Done',
          value: 'Done'
        }
      ],
      editSectionOptions: [
        'Order ID',
        'Customer',
        'Product List',
        'Total',
        'Add to Cart',
        'Check-out',
        'Address',
        'Phone',
        'Email',
        'Status'
      ],
      editSectionSelect: ['Customer', 'Product List', 'Total', 'Add to Cart']
    };
  },
  methods: {
    handleTag(selectObj) {
      // console.log(command);
      this.tagSelect = selectObj;

      switch (selectObj.value.toUpperCase()) {
        case 'SelectAll'.toUpperCase():
          this.tableData.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
          break;
        case 'UnselectAll'.toUpperCase():
          this.tagSelect = {}; // 清空
          this.$refs.multipleTable.clearSelection();
          break;
        default:
          this.tableData.forEach(item => {
            if (item.status.toUpperCase() === selectObj.value.toUpperCase()) {
              this.$refs.multipleTable.toggleRowSelection(item, true);
            } else {
              this.$refs.multipleTable.toggleRowSelection(item, false);
            }
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    isSectionSelect(value) {
      const index = this.editSectionSelect.findIndex(el => el === value);
      if (index === -1) {
        return false;
      }
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

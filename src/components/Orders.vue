<template>
  <div class="main orders">
    <div class="container">

      <div class="selectBox">

        <el-checkbox
          v-model="isCheckedTag"
          class="checkedTag"
          @change="handTagSelect">
        </el-checkbox>

        <el-dropdown class="tagSelect"
          placement="bottom-start"
          trigger="hover"
          @command="handleTag">
          <span class="el-dropdown-link">
            <i class="fas fa-caret-down"></i>
            <!-- {{ tagSelect.label}} -->
          </span>
          <el-dropdown-menu slot="dropdown" class="tag-dropdown-menu">
            <el-dropdown-item
              :command="item"
              v-for="item in tagOptions" :key="item.value">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown class="stateChange"
          placement="bottom-start"
          trigger="hover"
          @command="changeState">
          <span class="el-dropdown-link">
            <i class="fas fa-tags"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="stateChange-dropdown-menu">
            <span class="stateChange__title">Change Status to...</span>
            <el-dropdown-item
              :command="item"
              v-for="item in statusOptions" :key="item.value">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-popover
          placement="bottom-end"
          width="130px"
          trigger="click"
          popper-class="editSection"
          >
          <el-checkbox-group v-model="editSectionSelect" >
            <el-checkbox :label="item"
            v-for="item in editSectionOptions" :key="item">
            </el-checkbox>
          </el-checkbox-group>
          <el-button slot="reference" class="bt-editSection">
            EDIT SECTION
            <i class="fas fa-caret-down"></i>
          </el-button>
        </el-popover>

      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        :row-class-name="tableRowClassName"
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
          width="140"
          v-if="isSectionSelect('Customer')">
          <template slot-scope="scope">{{ scope.row.customer }}</template>
        </el-table-column>

        <el-table-column
          label="Product List"
          width="170"
          v-if="isSectionSelect('Product List')">
          <template slot-scope="scope">
            <ul class="productList">
              <li class="item" v-for="(item, index) in scope.row.productList" :key="index">
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
          width="90"
          v-if="isSectionSelect('Total')"
          class-name="currency-title"
          >
          <template slot-scope="scope" >
            <span class="currency-content">
              {{ '$'+ scope.row.total.toLocaleString('en-US') }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="Add to Cart"
          width="100"
          v-if="isSectionSelect('Add to Cart')">
          <template slot-scope="scope">
            {{ scope.row.addTime.split(' ')[0] }}
            <br/>
            {{ scope.row.addTime.split(' ')[1] }}
          </template>
        </el-table-column>

        <el-table-column
          label="Check-out"
          width="100"
          v-if="isSectionSelect('Check-out')">
          <template slot-scope="scope">
            {{ scope.row.checkOut.split(' ')[0] }}
            <br/>
            {{ scope.row.checkOut.split(' ')[1] }}
          </template>
        </el-table-column>

        <el-table-column
          label="Address"
          width="120"
          v-if="isSectionSelect('Address')">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>

        <el-table-column
          label="Phone"
          width="120"
          v-if="isSectionSelect('Phone')">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>

        <el-table-column
          label="Email"
          width="120"
          v-if="isSectionSelect('Email')">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>

        <el-table-column
          label="Status"
          width="125"
          v-if="isSectionSelect('Status')">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.status"
              :key="scope.row.orderID"
              class="statusSelect"
              :class="['bg-' + scope.row.status.toLowerCase()]">
              <el-option v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="statusOptions"
                >
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
  mounted() {
    const ajaxData = [];
    const myTag = ['paid', 'unpaid', 'shipping', 'done'];

    for (let i = 0; i < 10; i += 1) {
      const productList = [];

      for (let j = 0; j < this.getRandom(4, 1); j += 1) {
        productList.push({
          name: this.$faker().commerce.product(),
          price: Math.floor(this.$faker().commerce.price()),
          count: this.getRandom(30, 1)
        });
      }

      ajaxData.push({
        orderID: new Date().getTime(),
        customer: this.$faker().name.firstName(),
        productList,
        total: this.countProductListTotal(productList),
        addTime: this.$moment(this.$faker().date.past())
          .format('YYYY/M/D HH:m')
          .toString(),
        checkOut: this.$moment(this.$faker().date.past())
          .format('YYYY/M/D HH:m')
          .toString(),
        address: `${this.$faker().address.streetAddress()}, \n${this.$faker().address.city()}`,
        phone: this.$faker().phone.phoneNumberFormat(),
        email: this.$faker().internet.email(),
        status: myTag[Math.floor(Math.random() * myTag.length)]
      });

      this.tableData = ajaxData;
    }
  },
  data() {
    return {
      tableData: [],
      isCheckedTag: false,
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
          value: 'paid'
        },
        {
          label: 'Unpaid',
          value: 'unpaid'
        },
        {
          label: 'Shipping',
          value: 'shipping'
        },
        {
          label: 'Done',
          value: 'done'
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
      editSectionSelect: [
        'Customer',
        'Product List',
        'Total',
        'Add to Cart',
        'Check-out',
        'Address',
        'Status'
      ]
    };
  },
  methods: {
    getRandom(maxNum, minNum) {
      // eslint-disable-next-line
      return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    },
    countProductListTotal(obj) {
      return obj.reduce((prev, element) => {
        // console.log(prev,element);
        const sum = element.price * element.count;
        // 與之前的數值加總，回傳後代入下一輪的處理
        return prev + sum;
      }, 0);
    },
    handleTag(selectObj) {
      // console.log(command);
      this.tagSelect = selectObj;
      this.isCheckedTag = true;

      switch (this.tagSelect.value.toUpperCase()) {
        case 'SelectAll'.toUpperCase():
          this.tableData.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
          break;
        case 'UnselectAll'.toUpperCase():
          this.tagSelect = {}; // 清空
          this.isCheckedTag = false;
          this.$refs.multipleTable.clearSelection();
          break;
        default:
          this.tableData.forEach(item => {
            if (
              item.status.toUpperCase() === this.tagSelect.value.toUpperCase()
            ) {
              this.$refs.multipleTable.toggleRowSelection(item, true);
            } else {
              this.$refs.multipleTable.toggleRowSelection(item, false);
            }
          });
      }
    },
    handTagSelect() {
      if (!this.isCheckedTag) {
        this.tagSelect = {}; // 清空
        this.$refs.multipleTable.clearSelection();
      } else {
        this.tableData.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item, true);
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
    },
    changeState(selectObj) {
      // console.log(selectObj);
      // console.log(this.$refs.multipleTable.selection);

      this.$refs.multipleTable.selection.map(
        // eslint-disable-next-line
        item => (item.status = selectObj.value)
      );
    },
    tableRowClassName({ row }) {
      // console.log(row, index);
      // console.log(row, row.status);
      if (row.status.toUpperCase() === 'DONE') {
        return 'done';
      } else if (row.status.toUpperCase() === 'UNPAID') {
        return 'unpaid';
      }
      return '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

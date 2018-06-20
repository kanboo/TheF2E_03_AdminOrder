<template>
    <div class="main product">
    <div class="container">

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

      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        :span-method="arraySpanMethod"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="Product"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            <div class="imgBox" :style="{backgroundImage: `url(${scope.row.imgUrl})`}">
            </div>

          </template>
        </el-table-column>

        <el-table-column
          label="Original"
          width="100">
          <template slot-scope="scope">
            {{ '$' + scope.row.original.toLocaleString('en-US') }}
          </template>
        </el-table-column>

        <el-table-column
          label="Discount"
          width="100">
          <template slot-scope="scope">
            {{ '$' + scope.row.discount.toLocaleString('en-US') }}
          </template>
        </el-table-column>

        <el-table-column
          label="Size"
          width="70">
          <template slot-scope="scope">
            <div class="row inventoryInfo"
              v-for="(item, index) in scope.row.productInfo" :key="index">
              <div class="column">
                <span>{{item.size}}</span>
              </div>
              <div class="column">
                <span v-for="(inventory, index) in item.inventorys" :key="index">
                  {{inventory.color}}
                </span>
              </div>
              <div class="column">
                <span v-for="(inventory, index) in item.inventorys" :key="index">
                  {{inventory.count}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Color"
          width="70"
          >
        </el-table-column>
        <el-table-column
          label="Inventory"
          class-name="textRight"
          width="100"
          >
        </el-table-column>

        <el-table-column
          label="Status"
          width="200">
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
  name: 'Product',
  data() {
    return {
      tableData: [
        {
          productID: 'T0001',
          name: 'Mauris non tem.',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/giuliusa/128.jpg',
          original: 3200,
          discount: 2800,
          status: 'PUBLISHED',
          productInfo: [
            {
              size: 'L',
              inventorys: [
                {
                  color: 'aaa',
                  count: 30
                },
                {
                  color: 'bbb',
                  count: 20
                }
              ]
            },
            {
              size: 'M',
              inventorys: [
                {
                  color: 'ccc',
                  count: 300
                }
              ]
            }
          ]
        },
        {
          productID: 'T0002',
          name: 'Curabitur lobo.',
          imgUrl:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          original: 3200,
          discount: 2800,
          status: 'UNPUBLISHED',
          productInfo: [
            {
              size: 'L',
              inventorys: [
                {
                  color: 'Red',
                  count: 30
                },
                {
                  color: 'Blue',
                  count: 20
                }
              ]
            },
            {
              size: 'M',
              inventorys: [
                {
                  color: 'Orange',
                  count: 300
                }
              ]
            },
            {
              size: 'S',
              inventorys: [
                {
                  color: 'Pink',
                  count: 16
                }
              ]
            }
          ]
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
          label: 'Published',
          value: 'Published'
        },
        {
          label: 'UnPublished',
          value: 'UnPublished'
        }
      ],
      tagSelect: {},
      multipleSelection: [],
      statusOptions: [
        {
          value: 'PUBLISHED',
          label: 'PUBLISHED'
        },
        {
          value: 'UNPUBLISHED',
          label: 'UNPUBLISHED'
        }
      ]
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
    // eslint-disable-next-line
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合併 Size、Color、Inventory 三個欄位
      // console.log(row, column, rowIndex, columnIndex);

      if (columnIndex === 4) {
        return {
          rowspan: 1,
          colspan: 3
        };
      } else if (columnIndex === 5 || columnIndex === 6) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

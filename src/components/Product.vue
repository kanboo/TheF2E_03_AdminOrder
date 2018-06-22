<template>
    <div class="main product">
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

          <el-button class="btn-add" @click="isShowModal = !isShowModal">
            ADD NEW PRODUCT
            <i class="fas fa-plus"></i>
          </el-button>

        </div>

        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          :span-method="arraySpanMethod"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="Product"
            width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
              <div class="imgBox" :style="{backgroundImage: `url(${scope.row.imgUrl})`}">
              </div>

            </template>
          </el-table-column>

          <el-table-column
            label="Original"
            width="110"
            class-name="currency-title">
            <template slot-scope="scope">
              <span class="currency-content">
                {{ '$' + scope.row.original.toLocaleString('en-US') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="Discount"
            width="110"
            class-name="currency-title">
            <template slot-scope="scope">
              <span class="currency-content">
                {{ '$' + scope.row.discount.toLocaleString('en-US') }}
              </span>
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
            width="110"
            >
          </el-table-column>

          <el-table-column
            label="Status"
            width="200">
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
                  class="statusOptions">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

        </el-table>

      </div>
      <div class="mask" :class="{'active': isShowModal}" ></div>
      <div class="modal addProduct" :class="{'active': isShowModal}">

        <div class="addProduct__header">
          <div class="title">
            ADD NEW PRODUCT
          </div>
          <button class="modal-close" @click="isShowModal = !isShowModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="addProduct__content">
          <div class="panel__left">
            <div class="upload">
              <i class="fas fa-cloud-upload-alt"></i>
              <span>Drag an image or click here to upload…</span>
            </div>
            <div class="images">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
            </div>
          </div>
          <div class="panel__right">

            <b>Product Discription</b>
            <input type="text" placeholder="Vestibulum nec">
            <textarea placeholder="Discription"></textarea>
            <b>Product Discription</b>
            <div class="n2">
              <label class="set" title="Original">
                <input type="text" value="$3,200">
              </label>
              <label class="set" title="Discount">
                <input type="text" value="$2,800">
              </label>
            </div>
            <b>Specification</b>
            <div class="n3">
              <label class="set" title="Size">
                <select>
                  <option>L</option>
                  <option>M</option>
                  <option>S</option>
                </select> </label>
              <label class="set" title="Color">
                <input value="Gray">
              </label>
              <label class="set" title="Inventory">
                <input value="$2,800">
              </label> </div>
              <a class="add-specification">add new specification</a>
            </div>

        </div>


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
      ],
      isShowModal: false
    };
  },
  methods: {
    handleTag(selectObj) {
      // console.log(command);
      this.tagSelect = selectObj;
      this.isCheckedTag = true;

      switch (selectObj.value.toUpperCase()) {
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
            if (item.status.toUpperCase() === selectObj.value.toUpperCase()) {
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
      if (row.status.toUpperCase() === 'UNPUBLISHED') {
        return 'unpublished';
      }
      return '';
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

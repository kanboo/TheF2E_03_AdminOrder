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
                    {{inventory.count.toLocaleString('en-US')}}
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
          <button class="modal-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="addProduct__content">

          <div class="panel">
            <div class="panel__left">
              <div class="upload">
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Drag an image or click here to upload…</span>
              </div>
              <div class="images">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg" alt="">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg" alt="">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/chandlervdw/128.jpg" alt="">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" alt="">
              </div>
            </div>
            <div class="panel__right">

              <b>Product Discription</b>
              <el-input
                v-model="newProduct.name"
                placeholder="Vestibulum nec">
              </el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 7, maxRows: 7}"
                placeholder="Discription"
                v-model="newProduct.discription">
              </el-input>

              <b>Price</b>
              <div class="n2">
                <el-input
                  class="original"
                  placeholder="$0"
                  v-model="newProduct.original">
                  <template slot="prepend">Original</template>
                </el-input>
                <el-input
                  class="disconut"
                  placeholder="$0"
                  v-model="newProduct.disconut">
                  <template slot="prepend">Discount</template>
                </el-input>
              </div>

              <b>Specification</b>
              <div class="n3"
                v-for="(item, index) in newProduct.specification" :key="index">

                <div
                  class="el-input el-input-group el-input-group--prepend size">
                  <div class="el-input-group__prepend">Size</div>
                  <el-select
                    v-model="item.size"
                    placeholder="">
                    <el-option
                      v-for="item in sizeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

                <el-input
                  class="color"
                  placeholder=""
                  v-model="item.color">
                  <template slot="prepend">Color</template>
                </el-input>

                <el-input
                  class="inventory"
                  placeholder=""
                  v-model="item.inventory">
                  <template slot="prepend">Inventory</template>
                </el-input>

              </div>
              <el-button
                class="btn-addSpecification"
                @click="addSpecification"
              >
                ADD NEW SPECIFICATION
                <i class="fas fa-plus"></i>
              </el-button>

            </div>

          </div>

          <div class="footer">
            <el-button class="save"  @click="closeModal">
              SAVE DRAFT
            </el-button>
            <el-button class="publish"  @click="closeModal">
              PUBLISH
            </el-button>
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
      sizeOptions: [
        {
          value: 'XL',
          label: 'XL'
        },
        {
          value: 'L',
          label: 'L'
        },
        {
          value: 'M',
          label: 'M'
        },
        {
          value: 'S',
          label: 'S'
        }
      ],
      isShowModal: false,
      newProduct: {
        name: '',
        discription: '',
        original: '',
        disconut: '',
        specification: [
          {
            size: '',
            color: '',
            inventory: ''
          }
        ]
      }
    };
  },
  mounted() {
    const ajaxData = [];
    const myTag = ['PUBLISHED', 'UNPUBLISHED'];

    for (let i = 0; i < 10; i += 1) {
      const originPrice = Math.floor(this.$faker().commerce.price());

      ajaxData.push({
        productID: new Date().getTime(),
        name: this.$faker().commerce.productName(),
        imgUrl: `https://picsum.photos/70/70?image=${this.getRandom(
          1000,
          980
        )}`,
        original: originPrice,
        discount: Math.floor(parseInt(originPrice, 10) * 0.75),
        status: myTag[Math.floor(Math.random() * myTag.length)],
        productInfo: [
          {
            size: 'L',
            inventorys: [
              {
                color: 'Red',
                count: this.getRandom(10000, 1)
              },
              {
                color: 'Blue',
                count: this.getRandom(10000, 1)
              }
            ]
          },
          {
            size: 'M',
            inventorys: [
              {
                color: 'Green',
                count: this.getRandom(10000, 1)
              }
            ]
          }
        ]
      });

      this.tableData = ajaxData;
    }
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
    },
    addSpecification() {
      this.newProduct.specification.push({
        size: '',
        color: '',
        inventory: ''
      });
    },
    closeModal() {
      this.newProduct = {
        name: '',
        discription: '',
        original: '',
        disconut: '',
        specification: [
          {
            size: '',
            color: '',
            inventory: ''
          }
        ]
      };

      this.isShowModal = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lagn="scss">
</style>

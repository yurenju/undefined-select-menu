import { observable, autorun} from 'mobx';
import { chunk } from 'lodash';

/*
 TODO: width determined by elements, but has max width
    - pagination
      maxItemsPerPage = (menuHeight - (2 * itemHeight)) / menuHeight
        if there is more than fits on the page
*/

const ITEM_HEIGHT = 24;

const createStore = ({ menuMeta, menuItems }) => {
  let store = observable({
    trashbin: null,  //used for confirming deletion
    selected: null,  
    hovering: null,
    //editing is used for tracking changes to label on he editables
    editing: { 
      id: null,
      label: null
    },
    //staging is for anyting added via addable
    staging: null,
    currMenuItem: -1,
    menuMeta,
    menuItems,
    menuHeight: 240,
    paginate: true, //switch on if needed
    paginateSlot: [], //the items that will be shown on the page
    pages: [], // the actual pages
    activePage: 0, //the activly page
    switchPage(page) {
      //sitches the page
      this.activePage = page;
      this.drawPages();
    },
    drawPages() {
      let maxItems = this.maxItems();
      this.pages = chunk(this.menuItems, maxItems);
      this.paginateSlot = this.pages[this.actvePage];

    },
    createPages() {
      this.activePage = 0;
      this.drawPages();
    },
    maxItems() {
      /* todo: do this later once we have the items part working
      if ((this.state.store.menuItems.length * ITEM_HEIGHT) > this.menuHeight) {
        return (menuMeta.height - (2 * ITEM_HEIGHT))/ITEM_HEIGHT;
      } else {
        return this.state.store.menuItems.length;
      }
      */
      return 8;
    },
    selectItem(id) {
      this.selected = id;
    },
    clearStaging() {
      this.staging = null;
    },
    commitStaging() {
      this.menuItems.push(this.staging);
      this.clearStaging();
    },
    updateStaging(label) {
      if (this.staging)
        this.staging.label = label;
      else 
        this.staging = { label: label };
    },
    addItem({icon, label, disabled}) {
      //TODO
    },
    isHovering(id) {
      return this.hovering === id
    },
    setHovering(id) {
      if (this.hovering !== id) {
        this.hovering = id;
      }
    },
    setEditing(id) {
      //setup the editing for the item
      if (this.editing.id !== id) {
        this.editing = {
          id: id,
          label: this.menuItems[id].label
        }
      }
    },
    clearEditing() {
      this.editing = {
        id: null,
        label: null
      }
    },
    updateLabel(label) {
      this.editing.label = label;
    },
    commitEditing() {
      if (this.editing.id !== null) {
        this.menuItems[this.editing.id].label = this.editing.label;
        this.clearEditing();   
      }
    },
    setTrashBin(id) {
      this.clearEditing(); //so we don't get a editing and trash at the same time
      this.trashbin = id;
    },
    destroyItem(id) {
      //removes the item
      this.menuItems = this.menuItems.filter((item, index) => index !== id);
      this.clearTrashBin();
      
    },
    clearTrashBin() {
      this.trashbin = null;
    }
  });
  store.createPages();
  return store;
};

export default createStore;
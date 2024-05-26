import styled from 'styled-components';

const Wrapper = styled.article`
  /* padding: 1rem; */
  /* padding-top: 1rem; */
  /* width: 92vh; */
  height: 69vh;
  white-space: nowrap;
  position: relative;
  overflow: scroll;
  margin-top: 2rem;
  /* border-radius: 1rem; */

  /* overflow-x: scroll;
  overflow-y: hidden; */
  -webkit-overflow-scrolling: touch;
  .bom-table-container {
    border: 1px solid var(--tableBorder);
    border-radius: 10px;
    margin-top: 1rem;
    max-height: 65vh;
    /* height: 63vh; */
    overflow-y: auto !important;
  }
  /* table .bom-table {
    table-layout: fixed;
  } */
  .bom-table {
    width: 100%;
    /* height: 100%; */
    border-collapse: separate;
    border-spacing: 0;
    display: table;
    position: relative;
    background: var(--tableBackground);
    box-sizing: border-box;
    font-family: var(--crm-font-regular);

    box-sizing: border-box;
  }
  .thead-bom td {
    background: var(--bg_DDE9F6) !important;
    white-space: normal;
    padding-left: 20px;
    border-bottom: 2px solid var(--tableHeadBorder);
    cursor: default;
    background: var(--tableBackground);
    text-align: left;
    color: var(--headingColor);
    font-family: var(--crm-font-semibold);
    font-size: var(--crm-base-font-size);
    outline: 0;
    /* padding: 8px 10px; */
    padding: 11px 10px 10px;
    position: relative;
    display: table-cell;
    vertical-align: middle;
    min-width: 200px;
    box-sizing: border-box;
    text-transform: capitalize;
    border-right: 2px solid var(--tableHeadBorder);
    vertical-align: baseline !important;
  }
  .desc-col {
    width: 20%;
  }
  .item-bom td {
    text-transform: capitalize;
    cursor: pointer;
    vertical-align: middle;
    white-space: normal;
    padding-left: 20px;
    display: table-cell;
    border-bottom: 1px solid var(--tableListBorder);
    /* vertical-align: middle; */
    /* background: inherit; */
    min-width: 50px;
    box-sizing: border-box;
    padding: 11px 10px 10px;
    font-size: var(--crm-base-font-size);
    color: var(--baseColor);
    position: relative;
    border-right: 2px solid var(--tableHeadBorder);
  }
  .item-bom:hover,
  .item-bom:active {
    /* background: var(--tableListHover) !important; */
    background: var(--bg_DDE9F6) !important;
    cursor: pointer;
  }

  .buttons-tab-table {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    border-bottom: 2px solid var(--tableHeadBorder);
    padding-bottom: 1rem;
    /* position: sticky;
    z-index: 1;
    top: 0;
    background: var(--tableBackground);
    padding: 1rem;
    border-bottom: 1px solid var(--br_d7e2ed); */
  }
  .side-bar-header {
    position: sticky;
    z-index: 1;
    top: 0;
    background: var(--tableBackground);
    padding-bottom: 0.5rem;
    /* border-bottom: 1px solid var(--br_d7e2ed); */
    border-bottom: none !important;
  }
  .title-card-zcrm-tab {
    font-family: var(--crm-font-bold) !important;
    color: var(--headingColor) !important;
    font-size: var(--crm-large-font-size);
    margin: auto;
    /* text-align: left; */
    margin-left: 0;
    display: flex;
    justify-content: start;
    gap: 1rem;
  }
  .side-container {
    position: fixed;
    top: 15rem;
    right: 3rem;
    background: var(--tableBackground);
    width: 30%;
    box-shadow: 0 0 6px var(--formBoxShadowFocus) !important;
    border: 1px solid var(--formBorderFocus) !important;
    border-radius: 10px;
    height: 75vh;
    padding-left: 2rem;
    padding-right: 2rem;
    /* overflow-y: scroll; */
  }
  .form-container {
    overflow-y: scroll;
    height: 65vh;
  }
`;

export default Wrapper;

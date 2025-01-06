import { store, updateStorage } from "../store";
import { toHidden, toShow } from "../util";

const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");
// $를 사용하는 이유 : DOM 요소를 나타내는 변수라는 뜻으로 개발자들의 관습, jQuery 라이브러리에서 많이 사용했었음.

export function initCurrentAsset() {
  renderCurrentAsset();
  addCurrentAssetEventListener();
}

function addCurrentAssetEventListener() {
  $currentAssetValue.addEventListener("click", function (event) {
    if (!store.isFirstEdit) return;
    toHidden(event.target);
    toShow($currentAssetInput);
    toShow($currentAssetButton);

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toHidden($currentAssetInput);
    toShow($currentAssetValue);
    toShow($addItemButton);

    store.currentFunds = Number($currentAssetInput.value);
    renderCurrentAsset();

    store.isFirstEdit = false;

    updateStorage();
  });
}

export function renderCurrentAsset() {
  $currentAssetValue.textContent = store.currentFunds?.toLocaleString() ?? "-";
  // ?? 문법 : 왼쪽 값이 null, undefined일 경우 오른쪽 값 반환. ||와 비슷하지만 false, 0,""은 간주하지 않음.
  $currentAssetInput.value = store.currentFunds;
}

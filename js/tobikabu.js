// -------- debug --------
DEBUG_FLAG = false;
function debug(text) {
  if (DEBUG_FLAG) {
    debugblock.innerHTML += "debug: " + text + "<br />";
  }
}
// -------- debug --------

// -------- version --------
_version = "ver 0.1";
function setVerInfo() {
  verInfo.innerHTML = "(" + _version + ")";
}
// -------- version --------

// -------- const --------
SUN = 0;
MON1 = 1;
MON2 = 2;
TUE1 = 3;
TUE2 = 4;
WED1 = 5;
WED2 = 6;
THU1 = 7;
THU2 = 8;
FRI1 = 9;
FRI2 = 10;
SAT1 = 11;
SAT2 = 12;
DAY_COUNT = 13;
// -------- const --------
// -------- class --------
/// 【クラス】取りうる売値の範囲 /// [클래스] 취할 수있는 매매의 범위
function PriceRanges(priceMins, priceMaxs, isInRange) {
  this.priceMins = new Array(DAY_COUNT);
  this.priceMaxs = new Array(DAY_COUNT);
  for (var i = 0; i < DAY_COUNT; i++) {
    this.priceMins[i] =
      i in priceMins && priceMins[i] ? Math.max(priceMins[i], 1) : 1;
    this.priceMaxs[i] =
      i in priceMaxs && priceMaxs[i]
        ? Math.max(priceMaxs[i], 1)
        : Number.MAX_VALUE;
  }
  this.isInRange = isInRange;
}
// -------- class --------

// 結果表示欄をクリア // 결과 표시 란을 클리어
function resetResult() {
  resultblock.innerHTML = "";
  debugblock.innerHTML = "";
  return;
}
// 結果表示欄に結果を表示 // 결과 표시 란에 결과를 표시
function setResult(resultText) {
  resultblock.innerHTML = resultText;
  return;
}

// 買値比を小数点以下第４位で四捨五入した数を文字列にして返す // 산 가격 비율을 소수점 이하 4 번째로 반올림 한 숫자를 문자열로 반환
function stdPriceText(buy, sell) {
  if (buy && sell && buy != 0) {
    var sp = Math.round((sell * 1000) / buy);
    return (
      Math.floor(sp / 1000) +
      "." +
      (Math.floor(sp / 100) % 10) +
      (Math.floor(sp / 10) % 10) +
      (sp % 10)
    );
  } else {
    // 0, -0, null, NaN, undefined の時
    return "?.???";
  }
}

// 入力補助欄の数字からカブ価入力欄へ // 입력 보조 란 숫자에서 새끼 가치 입력란에
function lineToPrice() {
  var linePrice = "" + kabuka.line.value;
  linePrice = linePrice.replace(/[→／/、，,　 ]/g, "\t"); // 「→」「／」「/」「、」「，」「,」、全半角スペースをタブ記号に置換  //모든 공백을 탭 문자로 대체
  linePrice = linePrice.replace(
    /[＠@買い値購入額売り価格：:月火水木金土曜日午前後ＡＰＭａｐｍAPMapm]\t*/g,
    ""
  ); // 「＠@買い値購入額売り：:月火水木金土曜日午前後ＡＰＭａｐｍAPMapm」とそれに続くタブ記号を消去 // "@@ 사고 값 구입액 판매 : 월화 수목 금 토요일 오전 후 APMapmAPMapm"와 그 뒤에 탭 문자를 삭제
  linePrice = linePrice.replace(/[ベル]/g, ""); // 「ベ」「ル」を消去 // "베" "르"를 삭제
  linePrice = linePrice.replace(/０/g, "0"); // "０"を"0"に置換 "0"을 "0"으로 대체
  linePrice = linePrice.replace(/１/g, "1"); // "１"を"1"に置換
  linePrice = linePrice.replace(/２/g, "2"); // "２"を"2"に置換
  linePrice = linePrice.replace(/３/g, "3"); // "３"を"3"に置換
  linePrice = linePrice.replace(/４/g, "4"); // "４"を"4"に置換
  linePrice = linePrice.replace(/５/g, "5"); // "５"を"5"に置換
  linePrice = linePrice.replace(/６/g, "6"); // "６"を"6"に置換
  linePrice = linePrice.replace(/７/g, "7"); // "７"を"7"に置換
  linePrice = linePrice.replace(/８/g, "8"); // "８"を"8"に置換
  linePrice = linePrice.replace(/９/g, "9"); // "９"を"9"に置換
  linePrice = linePrice.replace(/[＞>][＞>]?1\t*/g, ""); // 「>1」「>>1」とそれに続くタブ記号を消去
  var priceTexts = linePrice.split("\t"); // タブ記号を区切り文字として分割 // 일본어 입력기 전각문자 입력 처리하는 부분으로 보임

  kabuka.p0.value =
    isNaN(priceTexts[0]) || !priceTexts[0] ? "" : priceTexts[0] - 0;
  kabuka.p1.value =
    isNaN(priceTexts[1]) || !priceTexts[1] ? "" : priceTexts[1] - 0;
  kabuka.p2.value =
    isNaN(priceTexts[2]) || !priceTexts[2] ? "" : priceTexts[2] - 0;
  kabuka.p3.value =
    isNaN(priceTexts[3]) || !priceTexts[3] ? "" : priceTexts[3] - 0;
  kabuka.p4.value =
    isNaN(priceTexts[4]) || !priceTexts[4] ? "" : priceTexts[4] - 0;
  kabuka.p5.value =
    isNaN(priceTexts[5]) || !priceTexts[5] ? "" : priceTexts[5] - 0;
  kabuka.p6.value =
    isNaN(priceTexts[6]) || !priceTexts[6] ? "" : priceTexts[6] - 0;
  kabuka.p7.value =
    isNaN(priceTexts[7]) || !priceTexts[7] ? "" : priceTexts[7] - 0;
  kabuka.p8.value =
    isNaN(priceTexts[8]) || !priceTexts[8] ? "" : priceTexts[8] - 0;
  kabuka.p9.value =
    isNaN(priceTexts[9]) || !priceTexts[9] ? "" : priceTexts[9] - 0;
  kabuka.p10.value =
    isNaN(priceTexts[10]) || !priceTexts[10] ? "" : priceTexts[10] - 0;
  kabuka.p11.value =
    isNaN(priceTexts[11]) || !priceTexts[11] ? "" : priceTexts[11] - 0;
  kabuka.p12.value =
    isNaN(priceTexts[12]) || !priceTexts[12] ? "" : priceTexts[12] - 0;
  return;
}

// コピペ用のテキストエリアを表示 // 복붙용의 텍스트 영역을 표시
function setCopipeText(prices) {
  var copipeText = "</textarea></form>";
  var lastDayFlag = false;
  for (var i = SAT2; i >= SUN; i--) {
    if (lastDayFlag) {
      copipeText = (i % 2 == 0 ? " " : "/") + copipeText;
    }
    if (prices[i]) {
      lastDayFlag = true;
    }
    if (lastDayFlag) {
      copipeText = (prices[i] ? prices[i] : "?") + copipeText;
    }
  }
  copipeText = "買値" + copipeText;
  if (prices[SAT2]) {
    copipeText = "&gt;&gt;1\n" + copipeText;
  }
  copipeText =
    "<h5>《コピペ用》</h5><form><textarea class='copipe' rows='2' cols='60' wrap='off' tabindex='18' readonly>" +
    copipeText;
  return copipeText;
}

// 波型の山／谷の文字列 // 물결 모양의 산 / 계곡 문자열 //파도형인 경우 특정 두 시간대의 시세가 일치 (AG = 월요일 오전과 목요일 오전이 일치)
function namiDetailText(taniSPeriod1, taniLPeriod1) {
  var yamaTani = "";
  switch (taniSPeriod1) {
    case MON1:
      yamaTani += "월AM=";
      break;
    case MON2:
      yamaTani += "월PM=";
      break;
    case TUE1:
      yamaTani += "화AM=";
      break;
    case TUE2:
      yamaTani += "화PM=";
      break;
    case WED1:
      yamaTani += "수AM=";
      break;
    case WED2:
      yamaTani += "수PM=";
      break;
    case THU1:
      yamaTani += "목AM=";
      break;
    case THU2:
      yamaTani += "목PM=";
      break;
    case FRI1:
      yamaTani += "금AM=";
      break;
    case FRI2:
      yamaTani += "금PM=";
      break;
    case SAT1:
      yamaTani += "토AM=";
      break;
    case SAT2:
      yamaTani += "토PM=";
      break;
    default:
      return "";
  }
  switch (taniLPeriod1) {
    case MON1:
      yamaTani += "월AM";
      break;
    case MON2:
      yamaTani += "월PM";
      break;
    case TUE1:
      yamaTani += "화AM";
      break;
    case TUE2:
      yamaTani += "화PM";
      break;
    case WED1:
      yamaTani += "수AM";
      break;
    case WED2:
      yamaTani += "수PM";
      break;
    case THU1:
      yamaTani += "목AM";
      break;
    case THU2:
      yamaTani += "목PM";
      break;
    case FRI1:
      yamaTani += "금AM";
      break;
    case FRI2:
      yamaTani += "금PM";
      break;
    case SAT1:
      yamaTani += "토AM";
      break;
    case SAT2:
      yamaTani += "토PM";
      break;
    default:
      return "";
  }
  //	yamaTani += "［<span class='namiDetail' title='"; // yama 산 tani 계곡
  yamaTani += "［";
  for (var i = MON1; i <= SAT2; i++) {
    if ((i - MON1) % 2 == 0 && i > MON1) {
      yamaTani += ",";
    }
    if (
      (taniSPeriod1 <= i && i <= taniSPeriod1 + 1) ||
      (taniLPeriod1 <= i && i <= taniLPeriod1 + 2)
    ) {
      yamaTani += "▽";
    } else {
      yamaTani += "▲";
    }
  }
  //	yamaTani += "'>詳細</span>］"; // 상세
  yamaTani += "］";
  return yamaTani;
}

function buyRangeText(buys) {
  if (buys.length == 0) {
    return " ";
  }

  var buyMin = 90;
  var buyMax = 110;
  var hasPrices = new Array(buyMax - buyMin + 1);
  for (var buy = buyMin; buy <= buyMax; buy++) {
    var index = buy - buyMin;
    hasPrices[index] = false;
  }
  for (var i = 0; i < buys.length; i++) {
    if (buys[i] && buys[i] - 0 && buyMin <= buys[i] && buys[i] <= buyMax) {
      var index = buys[i] - buyMin;
      hasPrices[index] = true;
    }
  }

  var text = "";
  var lastValue = undefined;
  for (var buy = buyMin; buy <= buyMax; buy++) {
    var index = buy - buyMin;
    if ((buy == buyMin || !hasPrices[index - 1]) && hasPrices[index]) {
      if (lastValue) {
        text += ",";
      }
      text += buy;
      lastValue = buy;
    }
    if ((buy == buyMax || !hasPrices[index + 1]) && hasPrices[index]) {
      if (buy != lastValue) {
        text += "～" + buy;
      }
    }
  }
  return text;
}

// 結果の表の行を作る // 결과 테이블의 행을 만든다
function makeResultTableRow(
  pattern,
  detail,
  buys,
  prices,
  priceMins,
  priceMaxs
) {
  var resultText = "";
  resultText += "<tr>";

  // 型 // 형 (=detail / 패턴 형태를 출력)
  //console.log("detail:", detail);
  if (detail) {
    resultText += "<th>" + pattern + "</th><th>" + detail + "</th>";
  } else {
    resultText += "<th colspan='2'>" + pattern + "</th>";
  }

  // 買値 // 무 산 가격 을 추가
  resultText += "<td class='buy'>" + buyRangeText(buys) + "</td>";

  // 売値 // 시세 // 시세를 출력하하는 곳  >>  여기 폼을 추가! -- 산 가격 이상이면 옐로우, 산 가격 2배 이상이면 레드
  for (var i = MON1; i <= SAT2; i++) {
    resultText += "<td>";
    //console.log("** rendering prices: ", resultText);
    if (prices[i]) {
      //			resultText += "<span class='bell'>" + prices[i] + "</span>";
      resultText += prices[i];
    } else if (priceMins[i] && priceMaxs[i]) {
      if (priceMaxs[i] > prices[0]) {
        // 일요일 구매한 가격보다 높으면)
        if (priceMaxs[i] >= prices[0] * 2) {
          // 2배 이상이라면
          resultText += priceMins[i] + "～" + priceMaxs[i] + "🟢";
        } else {
          {
            resultText += priceMins[i] + "～" + priceMaxs[i] + "🟡";
          }
        }
      } else {
        resultText += priceMins[i] + "～" + priceMaxs[i] + "🔴";
      }

      //			resultText += "<span class='bell'>" + priceMins[i] + "</span>～<span class='bell'>" + priceMaxs[i] + "</span>";
    } else {
      resultText += " ";
    }
    resultText += "</td>";
  }
  resultText += "</tr>\n";

  return resultText;
}

// 取りうる売値の範囲を求める // // 취할 수있는 매매(시세)의 범위를 추구
function calcPriceRanges(buy, prices, methods, borderMins, borderMaxs) {
  var priceMins = new Array(DAY_COUNT);
  var priceMaxs = new Array(DAY_COUNT);
  var isInRange = true;

  // 前から //전부터
  for (var i = MON1; i <= SAT2; i++) {
    switch (methods[i]) {
      case METHOD_PRICE:
        priceMins[i] = roundingL(borderMins[i] - _errorAllowance);
        priceMaxs[i] = roundingU(borderMaxs[i] + _errorAllowance);
        break;
      case METHOD_SP:
        priceMins[i] = roundingL((buy * borderMins[i]) / 100 - _errorAllowance);
        priceMaxs[i] = roundingU((buy * borderMaxs[i]) / 100 + _errorAllowance);
        break;
      case METHOD_PRICE_DIFF:
        if (i == MON1) {
          priceMins[i] = roundingL(buy + borderMins[i] - _errorAllowance);
          priceMaxs[i] = roundingU(buy + borderMaxs[i] + _errorAllowance);
        } else if (prices[i - 1]) {
          priceMins[i] = roundingL(
            prices[i - 1] + borderMins[i] - _errorAllowance
          );
          priceMaxs[i] = roundingU(
            prices[i - 1] + borderMaxs[i] + _errorAllowance
          );
        } else {
          priceMins[i] = roundingL(
            priceMins[i - 1] + borderMins[i] - _errorAllowance
          );
          priceMaxs[i] = roundingU(
            priceMaxs[i - 1] + borderMaxs[i] + _errorAllowance
          );
        }
        break;
      case METHOD_SP_DIFF:
        var spMin = 0;
        var spMax = 0;
        for (var j = i; j >= MON1; j--) {
          if (prices[j] && j != i) {
            priceMins[i] = roundingL(
              prices[j] + (buy * spMin) / 100 - _errorAllowance
            );
            priceMaxs[i] = roundingU(
              prices[j] + (buy * spMax) / 100 + _errorAllowance
            );
            break;
          } else if (
            methods[j] == METHOD_PRICE ||
            methods[j] == METHOD_PRICE_DIFF ||
            methods[j] == METHOD_PRICE_RATIO
          ) {
            priceMins[i] = roundingL(
              priceMins[j] + (buy * spMin) / 100 - _errorAllowance
            );
            priceMaxs[i] = roundingU(
              priceMaxs[j] + (buy * spMax) / 100 + _errorAllowance
            );
            break;
          } else if (methods[j] == METHOD_SP) {
            spMin += borderMins[j];
            spMax += borderMaxs[j];
            priceMins[i] = roundingL((buy * spMin) / 100 - _errorAllowance);
            priceMaxs[i] = roundingU((buy * spMax) / 100 + _errorAllowance);
            break;
          } else if (methods[j] == METHOD_SP_DIFF) {
            spMin += borderMins[j];
            spMax += borderMaxs[j];
            if (j == MON1) {
              spMin += 100;
              spMax += 100;
              priceMins[i] = roundingL((buy * spMin) / 100 - _errorAllowance);
              priceMaxs[i] = roundingU((buy * spMax) / 100 + _errorAllowance);
              break;
            }
            continue;
          } else {
            priceMins[i] = undefined;
            priceMaxs[i] = undefined;
            break;
          }
        }
        break;
      case METHOD_PRICE_RATIO:
        if (i == MON1) {
          priceMins[i] = roundingL(
            (buy * borderMins[i]) / 100 - _errorAllowance
          );
          priceMaxs[i] = roundingU(
            (buy * borderMaxs[i]) / 100 + _errorAllowance
          );
        } else if (prices[i - 1]) {
          priceMins[i] = roundingL(
            (prices[i - 1] * borderMins[i]) / 100 - _errorAllowance
          );
          priceMaxs[i] = roundingU(
            (prices[i - 1] * borderMaxs[i]) / 100 + _errorAllowance
          );
        } else {
          priceMins[i] = roundingL(
            (priceMins[i - 1] * borderMins[i]) / 100 - _errorAllowance
          );
          priceMaxs[i] = roundingU(
            (priceMaxs[i - 1] * borderMaxs[i]) / 100 + _errorAllowance
          );
        }
        break;
      default:
        priceMins[i] = undefined;
        priceMaxs[i] = undefined;
        break;
    }
  }

  // 後ろから // 뒤에서
  for (var i = SAT2; i >= MON2; i--) {
    var priceMinNew = undefined;
    var priceMaxNew = undefined;

    switch (methods[i]) {
      case METHOD_PRICE:
      case METHOD_SP:
        // NOP
        break;
      case METHOD_PRICE_DIFF:
        if (prices[i]) {
          priceMinNew = roundingL(prices[i] - borderMaxs[i] - _errorAllowance);
          priceMaxNew = roundingU(prices[i] - borderMins[i] + _errorAllowance);
        } else {
          priceMinNew = roundingL(
            priceMins[i] - borderMaxs[i] - _errorAllowance
          );
          priceMaxNew = roundingU(
            priceMaxs[i] - borderMins[i] + _errorAllowance
          );
        }
        break;
      case METHOD_SP_DIFF:
        var spMin = 0;
        var spMax = 0;
        for (var j = i; j <= SAT2; j++) {
          if (methods[j] == METHOD_PRICE || methods[j] == METHOD_SP) {
            break;
          } else if (
            methods[j] == METHOD_PRICE_DIFF ||
            methods[j] == METHOD_PRICE_RATIO
          ) {
            if (prices[j - 1]) {
              priceMinNew = roundingL(
                prices[j - 1] - (buy * spMax) / 100 - _errorAllowance
              );
              priceMaxNew = roundingU(
                prices[j - 1] - (buy * spMin) / 100 + _errorAllowance
              );
              break;
            } else {
              priceMinNew = roundingL(
                priceMins[j - 1] - (buy * spMax) / 100 - _errorAllowance
              );
              priceMaxNew = roundingU(
                priceMaxs[j - 1] - (buy * spMin) / 100 + _errorAllowance
              );
              break;
            }
          } else if (methods[j] == METHOD_SP_DIFF) {
            spMin += borderMins[j];
            spMax += borderMaxs[j];
            if (prices[j]) {
              priceMinNew = roundingL(
                prices[j] - (buy * spMax) / 100 - _errorAllowance
              );
              priceMaxNew = roundingU(
                prices[j] - (buy * spMin) / 100 + _errorAllowance
              );
              break;
            } else {
              continue;
            }
          } else {
            //					priceMins[i] = undefined;
            //					priceMaxs[i] = undefined;
            break;
          }
        }
        break;
      case METHOD_PRICE_RATIO:
        if (prices[i]) {
          priceMinNew = roundingL(
            (prices[i] * 100) / borderMaxs[i] - _errorAllowance
          );
          priceMaxNew = roundingU(
            (prices[i] * 100) / borderMins[i] + _errorAllowance
          );
        } else {
          priceMinNew = roundingL(
            (priceMins[i] * 100) / borderMaxs[i] - _errorAllowance
          );
          priceMaxNew = roundingU(
            (priceMaxs[i] * 100) / borderMins[i] + _errorAllowance
          );
        }
        break;
      default:
        //			priceMins[i] = undefined;
        //			priceMaxs[i] = undefined;
        break;
    }

    if (priceMinNew) {
      priceMins[i - 1] = priceMins[i - 1]
        ? Math.max(priceMins[i - 1], priceMinNew)
        : priceMinNew;
    }
    if (priceMaxNew) {
      priceMaxs[i - 1] = priceMaxs[i - 1]
        ? Math.min(priceMaxs[i - 1], priceMaxNew)
        : priceMaxNew;
    }
  }

  for (var i = MON1; i <= SAT2; i++) {
    if (prices[i] && priceMins[i] && priceMaxs[i]) {
      isInRange &= priceMins[i] <= prices[i] && prices[i] <= priceMaxs[i];
    }
  }
  return new PriceRanges(priceMins, priceMaxs, isInRange);
}
// 波型チェック // 웨이브 체크
function checkNami(buyL, buyU, prices) {
  var namiTaniSPeriod1s = new Array(
    false,
    _namiTaniSMonAm,
    _namiTaniSMonPm,
    _namiTaniSTueAm,
    _namiTaniSTuePm,
    _namiTaniSWedAm,
    _namiTaniSWedPm,
    _namiTaniSThuAm,
    _namiTaniSThuPm,
    _namiTaniSFriAm,
    _namiTaniSFriPm,
    _namiTaniSSatAm,
    _namiTaniSSatPm
  );
  var namiTaniLPeriod1s = new Array(
    false,
    _namiTaniLMonAm,
    _namiTaniLMonPm,
    _namiTaniLTueAm,
    _namiTaniLTuePm,
    _namiTaniLWedAm,
    _namiTaniLWedPm,
    _namiTaniLThuAm,
    _namiTaniLThuPm,
    _namiTaniLFriAm,
    _namiTaniLFriPm,
    _namiTaniLSatAm,
    _namiTaniLSatPm
  );

  var text = "";
  for (var i = MON1; i <= SAT2; i++) {
    if (!namiTaniSPeriod1s[i]) {
      continue;
    }
    for (var j = MON1; j <= SAT2; j++) {
      if (!namiTaniLPeriod1s[j]) {
        continue;
      } else if (j - i == -3 || j - i == 2) {
        // ５連谷になる場合 //5연곡 (연속 곡선? 연속 계곡?) 이 되는 경우
        continue;
      } else if (-3 < j - i && j - i < 2) {
        // ８山以上になる場合 // 8산 (상승?) 이상인 경우
        continue;
      }

      var methods = new Array(DAY_COUNT);
      var borderMins = new Array(DAY_COUNT);
      var borderMaxs = new Array(DAY_COUNT);
      for (var k = MON1; k <= SAT2; k++) {
        if (k == i) {
          methods[k] = _namiTaniS1Method;
          borderMins[k] = _namiTaniS1Min;
          borderMaxs[k] = _namiTaniS1Max;
        } else if (k == i + 1) {
          methods[k] = _namiTaniS2Method;
          borderMins[k] = _namiTaniS2Min;
          borderMaxs[k] = _namiTaniS2Max;
        } else if (k == j) {
          methods[k] = _namiTaniL1Method;
          borderMins[k] = _namiTaniL1Min;
          borderMaxs[k] = _namiTaniL1Max;
        } else if (k == j + 1) {
          methods[k] = _namiTaniL2Method;
          borderMins[k] = _namiTaniL2Min;
          borderMaxs[k] = _namiTaniL2Max;
        } else if (k == j + 2) {
          methods[k] = _namiTaniL3Method;
          borderMins[k] = _namiTaniL3Min;
          borderMaxs[k] = _namiTaniL3Max;
        } else {
          methods[k] = _namiYamaMethod;
          borderMins[k] = _namiYamaMin;
          borderMaxs[k] = _namiYamaMax;
        }
      }

      var buys = new Array();
      var priceMins = new Array(DAY_COUNT);
      var priceMaxs = new Array(DAY_COUNT);
      for (var buy = buyL; buy <= buyU; buy++) {
        var pr = calcPriceRanges(buy, prices, methods, borderMins, borderMaxs);
        if (pr.isInRange) {
          buys.push(buy);
          for (var k = MON1; k <= SAT2; k++) {
            priceMins[k] = priceMins[k]
              ? Math.min(priceMins[k], pr.priceMins[k])
              : pr.priceMins[k];
            priceMaxs[k] = priceMaxs[k]
              ? Math.max(priceMaxs[k], pr.priceMaxs[k])
              : pr.priceMaxs[k];
          }
        }
      }
      if (buys.length > 0) {
        text += makeResultTableRow(
          "파도형",
          namiDetailText(i, j),
          buys,
          prices,
          priceMins,
          priceMaxs
        );
      }
    }
  }
  return text;
}
// ジリ貧型チェック // 시세 하락 형 체크
function checkJiri(buyL, buyU, prices) {
  var methods = new Array(DAY_COUNT);
  var borderMins = new Array(DAY_COUNT);
  var borderMaxs = new Array(DAY_COUNT);
  for (var i = MON1; i <= SAT2; i++) {
    methods[i] = i == MON1 ? _jiriMonAmMethod : _jiriOtherMethod;
    borderMins[i] = i == MON1 ? _jiriMonAmMin : _jiriOtherMin;
    borderMaxs[i] = i == MON1 ? _jiriMonAmMax : _jiriOtherMax;
  }

  var text = "";
  var buys = new Array();
  var priceMins = new Array(DAY_COUNT);
  var priceMaxs = new Array(DAY_COUNT);
  for (var buy = buyL; buy <= buyU; buy++) {
    var pr = calcPriceRanges(buy, prices, methods, borderMins, borderMaxs);
    if (pr.isInRange) {
      buys.push(buy);
      for (var i = MON1; i <= SAT2; i++) {
        priceMins[i] = priceMins[i]
          ? Math.min(priceMins[i], pr.priceMins[i])
          : pr.priceMins[i];
        priceMaxs[i] = priceMaxs[i]
          ? Math.max(priceMaxs[i], pr.priceMaxs[i])
          : pr.priceMaxs[i];
      }
    }
  }
  if (buys.length > 0) {
    text += makeResultTableRow(
      "시세하락형",
      "",
      buys,
      prices,
      priceMins,
      priceMaxs
    );
  }
  return text;
}
// ３期型チェック // 3 기 형 체크 // 변조가 시작된 시점 부터 3번째 타임이 최고가
function checkFev3(buyL, buyU, prices) {
  var fev3Period1s = new Array(
    false,
    _fev3MonAm,
    _fev3MonPm,
    _fev3TueAm,
    _fev3TuePm,
    _fev3WedAm,
    _fev3WedPm,
    _fev3ThuAm,
    _fev3ThuPm,
    _fev3FriAm,
    _fev3FriPm,
    _fev3SatAm,
    _fev3SatPm
  );
  var details = new Array(
    "",
    "月요일 오전 변조",
    "月요일 오후 변조",
    "火요일 오전 변조",
    "火요일 오후 변조",
    "水요일 오전 변조",
    "水요일 오후 변조",
    "木요일 오전 변조",
    "木요일 오후 변조",
    "金요일 오전 변조",
    "金요일 오후 변조",
    "土요일 오전 변조",
    "土요일 오후 변조"
  );

  var text = "";
  for (var i = MON1; i <= SAT2; i++) {
    if (!fev3Period1s[i]) {
      continue;
    }

    var methods = new Array(DAY_COUNT);
    var borderMins = new Array(DAY_COUNT);
    var borderMaxs = new Array(DAY_COUNT);
    for (var j = MON1; j < i; j++) {
      methods[j] = j == MON1 ? _fev3MonAmMethod : _fev3BeforeMethod;
      borderMins[j] = j == MON1 ? _fev3MonAmMin : _fev3BeforeMin;
      borderMaxs[j] = j == MON1 ? _fev3MonAmMax : _fev3BeforeMax;
    }
    for (var j = i; j <= SAT2; j++) {
      switch (j - i) {
        case 0:
          methods[j] = _fev3Period1Method;
          borderMins[j] = _fev3Period1Min;
          borderMaxs[j] = _fev3Period1Max;
          break;
        case 1:
          methods[j] = _fev3Period2Method;
          borderMins[j] = _fev3Period2Min;
          borderMaxs[j] = _fev3Period2Max;
          break;
        case 2:
          methods[j] = _fev3Period3Method;
          borderMins[j] = _fev3Period3Min;
          borderMaxs[j] = _fev3Period3Max;
          break;
        case 3:
          methods[j] = _fev3Period4Method;
          borderMins[j] = _fev3Period4Min;
          borderMaxs[j] = _fev3Period4Max;
          break;
        case 4:
          methods[j] = _fev3Period5Method;
          borderMins[j] = _fev3Period5Min;
          borderMaxs[j] = _fev3Period5Max;
          break;
        case 5:
          methods[j] = _fev3Period6Method;
          borderMins[j] = _fev3Period6Min;
          borderMaxs[j] = _fev3Period6Max;
          break;
        default:
          methods[j] = _fev3AfterMethod;
          borderMins[j] = _fev3AfterMin;
          borderMaxs[j] = _fev3AfterMax;
          break;
      }
    }

    var buys = new Array();
    var priceMins = new Array(DAY_COUNT);
    var priceMaxs = new Array(DAY_COUNT);
    for (var buy = buyL; buy <= buyU; buy++) {
      var pr = calcPriceRanges(buy, prices, methods, borderMins, borderMaxs);
      if (pr.isInRange) {
        buys.push(buy);
        for (var j = MON1; j <= SAT2; j++) {
          priceMins[j] = priceMins[j]
            ? Math.min(priceMins[j], pr.priceMins[j])
            : pr.priceMins[j];
          priceMaxs[j] = priceMaxs[j]
            ? Math.max(priceMaxs[j], pr.priceMaxs[j])
            : pr.priceMaxs[j];
        }
      }
    }
    if (buys.length > 0) {
      text += makeResultTableRow(
        "3기형",
        details[i],
        buys,
        prices,
        priceMins,
        priceMaxs
      );
    }
  }
  return text;
}
// ４期型チェック // 4 기 형 체크 // 변조가 시작된 시점 부터 4번째 타임이 최고가
function checkFev4(buyL, buyU, prices) {
  var fev4Period1s = new Array(
    false,
    _fev4MonAm,
    _fev4MonPm,
    _fev4TueAm,
    _fev4TuePm,
    _fev4WedAm,
    _fev4WedPm,
    _fev4ThuAm,
    _fev4ThuPm,
    _fev4FriAm,
    _fev4FriPm,
    _fev4SatAm,
    _fev4SatPm
  );
  var details = new Array(
    "",
    "月요일 오전 변조",
    "月요일 오후 변조",
    "火요일 오전 변조",
    "火요일 오후 변조",
    "水요일 오전 변조",
    "水요일 오후 변조",
    "木요일 오전 변조",
    "木요일 오후 변조",
    "金요일 오전 변조",
    "金요일 오후 변조",
    "土요일 오전 변조",
    "土요일 오후 변조"
  );

  var text = "";
  for (var i = MON1; i <= SAT2; i++) {
    if (!fev4Period1s[i]) {
      continue;
    }

    var methods = new Array(DAY_COUNT);
    var borderMins = new Array(DAY_COUNT);
    var borderMaxs = new Array(DAY_COUNT);
    for (var j = MON1; j < i; j++) {
      methods[j] = j == MON1 ? _fev4MonAmMethod : _fev4BeforeMethod;
      borderMins[j] = j == MON1 ? _fev4MonAmMin : _fev4BeforeMin;
      borderMaxs[j] = j == MON1 ? _fev4MonAmMax : _fev4BeforeMax;
    }
    for (var j = i; j <= SAT2; j++) {
      switch (j - i) {
        case 0:
          methods[j] = _fev4Period1Method;
          borderMins[j] = _fev4Period1Min;
          borderMaxs[j] = _fev4Period1Max;
          break;
        case 1:
          methods[j] = _fev4Period2Method;
          borderMins[j] = _fev4Period2Min;
          borderMaxs[j] = _fev4Period2Max;
          break;
        case 2:
          methods[j] = _fev4Period3Method;
          borderMins[j] = _fev4Period3Min;
          borderMaxs[j] = _fev4Period3Max;
          break;
        case 3:
          methods[j] = _fev4Period4Method;
          borderMins[j] = _fev4Period4Min;
          borderMaxs[j] = _fev4Period4Max;
          break;
        case 4:
          methods[j] = _fev4Period5Method;
          borderMins[j] = _fev4Period5Min;
          borderMaxs[j] = _fev4Period5Max;
          break;
        case 5:
          methods[j] = _fev4Period6Method;
          borderMins[j] = _fev4Period6Min;
          borderMaxs[j] = _fev4Period6Max;
          break;
        default:
          methods[j] = _fev4AfterMethod;
          borderMins[j] = _fev4AfterMin;
          borderMaxs[j] = _fev4AfterMax;
          break;
      }
    }

    var buys = new Array();
    var priceMins = new Array(DAY_COUNT);
    var priceMaxs = new Array(DAY_COUNT);
    for (var buy = buyL; buy <= buyU; buy++) {
      var pr = calcPriceRanges(buy, prices, methods, borderMins, borderMaxs);
      if (pr.isInRange) {
        buys.push(buy);
        for (var j = MON1; j <= SAT2; j++) {
          priceMins[j] = priceMins[j]
            ? Math.min(priceMins[j], pr.priceMins[j])
            : pr.priceMins[j];
          priceMaxs[j] = priceMaxs[j]
            ? Math.max(priceMaxs[j], pr.priceMaxs[j])
            : pr.priceMaxs[j];
        }
      }
    }
    // 第４期がピークになるように予想値を変更する（※応急処置：設定に汎用性がないため要修正） // 제 4 기 피크가되도록 예상 값을 변경 (※ 응급 처치 : 설정에 융통성이 없기 때문에 필요 수정)
    if (_fev4Period4IsPeak) {
      if (i + 3 > SAT2) {
        // NOP
      } else if (prices[i + 3]) {
        // 第４期のカブ価が入力されている場合 // 제 4 기 순무 가치가 입력되는 경우
        if (!prices[i + 2] && priceMaxs[i + 2] > prices[i + 3]) {
          // 第３期のカブ価が未入力で、第３期の予想値の最大値が第４期のカブ価を越えている場合 // 제 3 기 순무 가치가 미입력에서 제 3 기의 예상 값의 최대 값이 제 4 기 순무 가치를 넘고있는 경우
          priceMaxs[i + 2] = prices[i + 3];
        }
        if (
          i + 4 <= SAT2 &&
          !prices[i + 4] &&
          priceMaxs[i + 4] > prices[i + 3]
        ) {
          // 第５期のカブ価が未入力で、第５期の予想値の最大値が第４期のカブ価を越えている場合 // 5 기 순무 가치가 미입력에서 제 5 기의 예상 값의 최대 값이 제 4 기 순무 가치를 넘고있는 경우
          priceMaxs[i + 4] = prices[i + 3];
        }
      } else {
        // 第４期のカブ価が未入力の場合
        if (prices[i + 2] && priceMins[i + 3] < prices[i + 2]) {
          // 第４期の予想値の最小値が第３期のカブ価を下回る場合 // 제 4 기의 예상 값의 최소값이 제 3 기 순무 가치를 밑도는 경우
          priceMins[i + 3] = prices[i + 2];
        }
        if (
          i + 4 <= SAT2 &&
          prices[i + 4] &&
          priceMins[i + 3] < prices[i + 4]
        ) {
          // 第４期の予想値の最小値が第５期のカブ価を下回る場合 // 제 4 기의 예상 값의 최소값이 제 5 기 순무 가치를 밑도는 경우
          priceMins[i + 3] = prices[i + 4];
        }
      }
    }
    if (buys.length > 0) {
      text += makeResultTableRow(
        "4기형",
        details[i],
        buys,
        prices,
        priceMins,
        priceMaxs
      );
    }
  }
  return text;
}
// カブ価分析 // 순무 가치 분석
function analyze(prices) {
  var buyL = prices[SUN] && prices[SUN] > 0 ? prices[SUN] : 90;
  var buyU = prices[SUN] && prices[SUN] > 0 ? prices[SUN] : 110;

  var resultText = "";
  resultText += "<h4>[결과]</h4>\n";
  resultText += "<h5>《가능한 형태》</h5>\n";
  resultText += "<p>\n";
  resultText += "<table class='result'><tbody>\n";
  resultText +=
    "<tr><th rowspan='2' colspan='2'>형</th><th class='buy' rowspan='2'>구입가</th><th colspan='12'>시세・예측시세</th></tr>\n";
  resultText +=
    "<tr><th>月AM</th><th>月PM</th><th>火AM</th><th>火PM</th><th>水AM</th><th>水PM</th><th>木AM</th><th>木PM</th><th>金AM</th><th>金PM</th><th>土AM</th><th>土PM</th></tr>\n";
  resultText += "<tr><th colspan='2'>（입력값）</th>";
  for (var i = SUN; i <= SAT2; i++) {
    resultText += "<td>";
    if (prices[i]) {
      resultText += "<span class='bell'>" + prices[i] + "</span>";
      if (i != SUN && prices[SUN]) {
        resultText +=
          "<br /><span class='sp'>(" +
          stdPriceText(prices[SUN], prices[i]) +
          ")</span>";
      }
    } else {
      resultText += " ";
    }
    resultText += "</td>";
  }
  resultText += "</tr>\n";
  resultText += "<tr><th colspan='15'> </th></tr>\n"; // 区切り線 //구분선

  var hasResult = false;
  // 波型チェック //파도형 체크
  var resultTextNami = checkNami(buyL, buyU, prices);
  if (resultTextNami) {
    resultText += resultTextNami;
    hasResult = true;
  }
  // ジリ貧型チェック //하락형 체크
  var resultTextJiri = checkJiri(buyL, buyU, prices);
  if (resultTextJiri) {
    resultText += resultTextJiri;
    hasResult = true;
  }
  // ３期型チェック //3기형 체크
  var resultTextFev3 = checkFev3(buyL, buyU, prices);
  if (resultTextFev3) {
    resultText += resultTextFev3;
    hasResult = true;
  }
  // ４期型チェック //4기형 체크
  var resultTextFev4 = checkFev4(buyL, buyU, prices);
  if (resultTextFev4) {
    resultText += resultTextFev4;
    hasResult = true;
  }
  if (!hasResult) {
    resultText += "<tr><td colspan='15'>해당 없음</td></tr>\n";
  }

  resultText += "</table></tbody>\n";
  resultText += "</p>\n";
  resultText += "<br />\n";

  // コピペ用テキストエリア // 복붙용 텍스트 영역
  resultText += setCopipeText(prices);

  resultText += "<br />\n";
  resultText += "<p>예측 종료</p></div>\n";
  return resultText;
}

function calc() {
  // オプション値を取得 //옵션 값을 취득
  getOption();

  // フォームから値取得 //폼에서 값 취득
  var array = new Array(
    kabuka.p0.value,
    kabuka.p1.value,
    kabuka.p2.value,
    kabuka.p3.value,
    kabuka.p4.value,
    kabuka.p5.value,
    kabuka.p6.value,
    kabuka.p7.value,
    kabuka.p8.value,
    kabuka.p9.value,
    kabuka.p10.value,
    kabuka.p11.value,
    kabuka.p12.value
  );
  var prices = new Array(DAY_COUNT);
  for (var i = 0; i < prices.length; i++) {
    if (i in array) {
      if (array[i] == null || array[i] == undefined || array[i] == "") {
        prices[i] = undefined;
      } else {
        array[i] = array[i].replace(/０/g, "0"); // "０"を"0"に置換
        array[i] = array[i].replace(/１/g, "1"); // "１"を"1"に置換
        array[i] = array[i].replace(/２/g, "2"); // "２"を"2"に置換
        array[i] = array[i].replace(/３/g, "3"); // "３"を"3"に置換
        array[i] = array[i].replace(/４/g, "4"); // "４"を"4"に置換
        array[i] = array[i].replace(/５/g, "5"); // "５"を"5"に置換
        array[i] = array[i].replace(/６/g, "6"); // "６"を"6"に置換
        array[i] = array[i].replace(/７/g, "7"); // "７"を"7"に置換
        array[i] = array[i].replace(/８/g, "8"); // "８"を"8"に置換
        array[i] = array[i].replace(/９/g, "9"); // "９"を"9"に置換
        prices[i] = array[i] - 0; // 文字列を数に変換
      }
    } else {
      prices[i] = undefined;
    }
  }

  // カブ価を分析 //무값을 분석
  console.log("Prices: ", prices[0]);
  var resultText = analyze(prices);

  //console.log("resultText: ", resultText);
  setResult(resultText);
  return;
}

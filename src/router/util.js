export const statusText = {
  1: '审核中',
  2: '准备中',
  3: '施工中',
  4: '完成',
  5: '终止'
}

export function callUs() {
  $.alert(`
    <div style="text-align: center;color:#586C94">
      <a href="tel:028-85147492">028-85147492</a>
      <br><br>
      <a href="tel:15196612058">15196612058</a>
    </div>
  `, '请选择电话拨打')
}

export function callNumbers(numbers) {
  const anchors = numbers.map(number => {
    return `<a href="tel:${number}">${number}</a>`;
  });
  $.alert(`
    <div style="text-align: center;color:#586C94">
      ${anchors.join("<br><br>")}
    </div>
  `, '请选择电话拨打');
}

export function addComment() {
  $.modal({
    title: "Hello",
    text: "我是自定义的modal",
    buttons: [
      { text: "支付宝", onClick: function () { console.log(1) } },
      { text: "微信支付", onClick: function () { console.log(2) } },
      { text: "取消", className: "default", onClick: function () { console.log(3) } },
    ]
  })
}
export default function (list: any[]) {
  return list.sort(function () {
    return Math.random() - 0.5
  })
}

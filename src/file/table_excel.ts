interface TableExportExcelProps {
  name: string
  columns: {
    key: string
    title: string
  }[]
  data: any[]
  // eslint-disable-next-line no-unused-vars
  tpl?: (title: string) => string
}

const uri = 'data:application/vnd.ms-excel;base64,',
  template =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta http-equiv="Content-type" content="text/html;charset=UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
    '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
  base64 = function (s: string | number | boolean) {
    return window.btoa(unescape(encodeURIComponent(s)))
  },
  format = function (
    s: string,
    c: { [x: string]: any; worksheet?: any; table?: any },
  ) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p]
    })
  }

const currentDate = () => {
  // 获取当前日期
  const date = new Date()

  // 获取当前月份
  let nowMonth: string | number = date.getMonth() + 1

  // 获取当前是几号
  let strDate: string | number = date.getDate()

  // 添加分隔符“-”
  const seperator = ''

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return date.getFullYear() + seperator + nowMonth + seperator + strDate
}

const toExcel = (table: { innerHTML: any }, name: any) => {
  const ctx = {
    worksheet: name || 'Worksheet',
    table: table.innerHTML,
  }

  const downloadUrl = uri + base64(format(template, ctx))

  let link: any = document.createElement('a')

  link.download = `${name}.xls`
  link.href = downloadUrl
  link.click()
  link = null
}

export default (props: TableExportExcelProps) => {
  const { name, columns, data } = props

  if (!props.tpl) props.tpl = title => title
  const $table = document.createElement('table')
  const head =
    '<thead><tr>' +
    columns
      .map(col => {
        return '<th>' + props.tpl!(col.title) + '</th>'
      })
      .join('') +
    '</tr></thead>'
  const body =
    '<tbody>' +
    data
      .map(row => {
        return (
          '<tr>' +
          columns
            .map(col => {
              let td = row[col.key] ?? '-'

              if (typeof td === 'object') {
                td = JSON.stringify(td)
              }
              return '<td>' + td + '</td>'
            })
            .join('') +
          '</tr>'
        )
      })
      .join('') +
    '</tbody>'

  $table.innerHTML = `<table>${head}${body}</table>`
  toExcel($table, name + '-' + currentDate())
}

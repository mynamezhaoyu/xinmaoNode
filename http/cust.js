import connection from './api'
import moment from 'moment'
let obj = {
  addCust(param) { // 新增客户
    return new Promise((resolve, reject) => {
      let myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let str = `INSERT INTO customer (name, phone, address, detailAddress, photo, createDate, createUser) values ("${param.name}", "${param.phone}", "${param.address}", "${param.detailaddress}", "${param.photo}", "${myDate}", "${param.currentId}")`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "新增成功",
            success: true
          }
          if (err) {
            Object.assign(obj, {
              message: '新增失败',
              success: false
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  },
  queryCust(param) { // 查询客户
    return new Promise((resolve, reject) => {
      let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName from customer ta left join user tb ON ta.createUser = tb.id`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {
              message: '查询失败,请联系管理员!',
              success: false,
              str: str
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  },
  deleteCust(param) { // 删除客户
    return new Promise((resolve, reject) => {
      let str = `delete from customer where id = ${param.id}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {
              message: '删除失败, 请联系管理员!',
              success: false
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  }
}
export default obj
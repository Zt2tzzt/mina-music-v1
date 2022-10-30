export const db = wx.cloud.database()

class ZTCollection {
  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  // 增删改查

  insert(data) {
    return this.collection.add({ data })
  }

  delete(condition, isDoc = true) {
    return isDoc ? this.collection.doc(condition).remove() : this.collection.where(condition).remove()
  }

  update(condition, data, isDoc = true) {
    return isDoc ? this.collection.doc(condition).update({ data }) : this.collection.where(condition).update({ data })
  }

  query(offset  = 0, size = 20, condition = {}, isDoc = false) {
    return isDoc ? this.collection.doc(condition).get() : this.collection.where(condition).skip(offset).limit(size).get()
  }
}

export const favorCollection = new ZTCollection('c_favor')
export const likeCollection = new ZTCollection('c_like')
export const historyCollection = new ZTCollection('c_history')
export const playListCollection = new ZTCollection('c_playList')
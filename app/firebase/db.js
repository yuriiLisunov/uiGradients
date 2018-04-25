import { db } from './firebase'

export async function favGradient (gradientSlug, userID) {
  const querySnapshot = await db.collection('gradients').doc(gradientSlug)
  await querySnapshot.update('favs', { [userID]: true })
  console.log('done')
}

export async function getGradients () {
  const querySnapshot = await db.collection('gradients').get()
  const data = []
  // querySnapshot.forEach(doc => { data[doc.id] = doc.data() })
  querySnapshot.forEach(doc => {
    data.push({
      slug: doc.id,
      favs: doc.data().favs
    })
  })
  return data
}

export const uploadGradients = (gradients) => {
  gradients.forEach(gradient => {
    db
      .collection('gradients')
      .doc(gradient.slug)
      .set(gradient)
      .then(() => {
        console.log('Added gradient:', gradient.name)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Q5PQdIUFGxBbG92P","label":"anime","bookmarks":[{"id":"jyBuGC10EGXSlNmV","label":"anlist profile","url":"https://anilist.co/user/archN3mesis/"},{"id":"E4E2lHEsNxh9N1kr","label":"nyaa","url":"https://nyaa.si/"},{"id":"eL6rCLxZ4sgvWcho","label":"allanime","url":"https://allanime.to/"},{"id":"caPTGnUXxTJzYqE1","label":"thatnovelcorner","url":"https://thatnovelcorner.com/"}]},{"id":"titika2wNoy7mwPl","label":"socials","bookmarks":[{"id":"oftrLyADmZrW17h0","label":"discord","url":"www.discord.com"},{"id":"kWRrvp2yVqaDoZc6","label":"whatsapp","url":"https://web.whatsapp.com/"},{"id":"usFOnzPC1BvD1YAT","label":"telegram","url":"https://web.telegram.org/"},{"id":"ZySVzaXCAGd3MQeC","label":"reddit","url":"https://reddit.com/"}]},{"id":"kUywuGAVZkA362tN","label":"google","bookmarks":[{"id":"yO7IwZ0zb0G9OZ0S","label":"youtube","url":"https://youtube.com/"},{"id":"ybqyIsZMgr9weCdd","label":"gmail","url":"https://gmail.com/"},{"id":"1qv8t78TdevwaKdQ","label":"drive","url":"https://drive.google.com/"}]},{"id":"nlMFhID3d3i5cI2s","label":"school","bookmarks":[{"id":"wPNQUvkJ0nKmvk32","label":"nios dashboard","url":"https://sdmis.nios.ac.in/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()

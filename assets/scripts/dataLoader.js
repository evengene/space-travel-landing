export const handleResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export const handleData = (data, category, populateContent) => {
  console.log('handleData called with data:', data, 'and category:', category);
  if (!data) return;
  console.log('data[category] length:', data[category].length);
  data[category].forEach((destination, index) =>
    populateContent(destination, index));
}

export const handleError = (error) => {
  console.error(`Fetch error: ${error.message}`);
}

export const showSelectedItem = (list, index) => {
  list.forEach((item) => {
    item.style.display = 'none';
  });
  list[index].style.display = 'block';
}

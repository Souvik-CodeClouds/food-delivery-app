export function setItemWithExpiry(key, value, ttl = 2592000000) {
    const now = new Date();
   
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };

    localStorage.setItem(key, JSON.stringify(item));
}
export function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
    }
	const {value}=item
	return value;
}
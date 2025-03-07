const photoData = [
    {
        id: 1,
        imageUrl: "/assets/2F405742-1B88-4B34-A152-6EE832017313_1_105_c.jpeg",
        thumbnailUrl: "/assets/thumbnail/7D431DEF-1D8A-4F29-9C35-EB99650CEE62.jpeg",
        title: "New Cover",
        description: "Shit i'm pretty sure i used this as a photo for a Video cover.",
        location: "My Home",
        date: "2025-1-15",
        camera: {
            body: "Apple Iphone 12",
            lens: "Wide Camera — 26 mm ƒ1.6",
            settings: "ISO 1000 26 mm ƒ1.6 1/27s"
        }
    },
    {
        id: 1,
        imageUrl: "#replace With Actual Path",
        thumbnailUrl: "Hopfully your monkey ass has a path",
        title: "Title bitch, kinda given?",
        description: "Gonna impress someone?",
        location: "DESTINATION HOE!!",
        date: "A date would be nice;)",
        camera: {
            body: "Device?",
            lens: "Settings should be easy to figure out",
            settings: "dude.."
        }
    }
    // Add more of your photos here
];

let currentPage = 0;
const PHOTOS_PER_PAGE = 12;

function fetchMorePhotos() {
    return new Promise((resolve) => {
        const start = currentPage * PHOTOS_PER_PAGE;
        const end = start + PHOTOS_PER_PAGE;
        const photos = photoData.slice(start, end);
        
        if (photos.length > 0) {
            currentPage++;
            setTimeout(() => resolve(photos), 500); // Simulate network delay
        } else {
            resolve([]); // No more photos
        }
    });
}

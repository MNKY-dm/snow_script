async function applyTemplate() {
    try {
        const overlay = (await fetch("/overlay/overlay.html")).text();
    } catch (e) {
        console.error("Erreur lors de l'appel d'overlay.html : ", e);
    }


}
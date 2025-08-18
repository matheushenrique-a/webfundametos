const quad = document.getElementById('quadrado');
let isDragging = false;
let isResizing = false;
let resizeDir = '';
let offsetX, offsetY;
let startRect = null;
let startX = 0;
let startY = 0;
const borderSize = 10;
const minSize = 100;

// Detecta cursor sobre bordas (antes do clique)
quad.addEventListener('mousemove', (e) => {
    if (isResizing) {
        quad.style.cursor = getCursor(resizeDir);
        return;
    }

    const rect = quad.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let dir = '';

    if (x < borderSize) dir += 'w';
    else if (x > rect.width - borderSize) dir += 'e';

    if (y < borderSize) dir += 'n';
    else if (y > rect.height - borderSize) dir += 's';

    quad.style.cursor = dir ? getCursor(dir) : 'move';
});

// Inicia drag ou resize
quad.addEventListener('mousedown', (e) => {
    const rect = quad.getBoundingClientRect();
    startRect = rect;
    startX = e.clientX;
    startY = e.clientY;

    resizeDir = '';

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < borderSize) resizeDir += 'w';
    else if (x > rect.width - borderSize) resizeDir += 'e';

    if (y < borderSize) resizeDir += 'n';
    else if (y > rect.height - borderSize) resizeDir += 's';

    if (resizeDir) {
        isResizing = true;
    } else {
        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    }

    e.preventDefault();
});

// Drag e resize
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        quad.style.left = e.clientX - offsetX + 'px';
        quad.style.top = e.clientY - offsetY + 'px';
    } else if (isResizing) {
        let newWidth = startRect.width;
        let newHeight = startRect.height;
        let newLeft = startRect.left;
        let newTop = startRect.top;

        if (resizeDir.includes('e')) {
            newWidth = Math.max(minSize, startRect.width + (e.clientX - startX));
        }
        if (resizeDir.includes('s')) {
            newHeight = Math.max(minSize, startRect.height + (e.clientY - startY));
        }
        if (resizeDir.includes('w')) {
            newWidth = Math.max(minSize, startRect.width - (e.clientX - startX));
            newLeft = startRect.right - newWidth;
        }
        if (resizeDir.includes('n')) {
            newHeight = Math.max(minSize, startRect.height - (e.clientY - startY));
            newTop = startRect.bottom - newHeight;
        }

        quad.style.width = newWidth + 'px';
        quad.style.height = newHeight + 'px';
        quad.style.left = newLeft + 'px';
        quad.style.top = newTop + 'px';
    }
});

// Finaliza drag ou resize
document.addEventListener('mouseup', () => {
    isDragging = false;
    isResizing = false;
    resizeDir = '';
    startRect = null;
});

// Função auxiliar para retornar o cursor correto
function getCursor(dir) {
    if (dir.length === 1) {
        return dir === 'n' ? 'n-resize' :
               dir === 's' ? 's-resize' :
               dir === 'e' ? 'e-resize' : 'w-resize';
    }
    if ((dir.includes('n') && dir.includes('w')) || (dir.includes('s') && dir.includes('e'))) return 'nwse-resize';
    if ((dir.includes('n') && dir.includes('e')) || (dir.includes('s') && dir.includes('w'))) return 'nesw-resize';
    return 'move';
}

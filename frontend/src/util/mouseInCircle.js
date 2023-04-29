export default function (x, y, radius, mouse_x, mouse_y) {
	return Math.sqrt((x - mouse_x) ** 2 + (y - mouse_y) ** 2) <= radius
}


import { useState, createContext } from "react"

const ThemeContext = createContext()

const SCREEN_THEME = {
	Light_Theme: {
		bg_Selected: "bg-gradient-to-r from-white-700 via-gray-900 to-black",
		text_Color: "text-gray-700",
		navBar_LinkColor: "bg-yellow-400",
		checked: false
	},
	Dark_Theme: {
		bg_Selected: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
		text_Color: "text-white",
		navBar_LinkColor: "bg-gray-800",
		checked: true
	}
}

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		if (localStorage.getItem("Theme")) {
			const localStorageTheme = JSON.parse(localStorage.getItem("Theme"))
			return JSON.stringify(localStorageTheme) === JSON.stringify(SCREEN_THEME.Light_Theme)
				? SCREEN_THEME.Dark_Theme
				: SCREEN_THEME.Light_Theme
		}
		return SCREEN_THEME.Light_Theme
	})

	const handleTheme = () => {
		const theme_Selected = JSON.stringify(theme)
		theme_Selected === JSON.stringify(SCREEN_THEME.Light_Theme)
			? setTheme(SCREEN_THEME.Dark_Theme)
			: setTheme(SCREEN_THEME.Light_Theme)
		localStorage.setItem("Theme", JSON.stringify(theme))
	}

	return (
		<ThemeContext.Provider value={{ handleTheme, theme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export {
	ThemeProvider,
	ThemeContext
}
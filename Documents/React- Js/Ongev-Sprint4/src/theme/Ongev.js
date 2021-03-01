import { createMuiTheme} from "@material-ui/core/styles";
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

const palette = {
    primary: {
        pale: '#E8F7FF',
        light: '#A3DEF6',
        main: '#2AAAE1',
        dark: '#1679BE',
        darkest: '#175377',
        contrastText: '#fff',
    },
    secondary: {
        pale: 'rgba(230,243,209,0.2)',
        light: '#C2E685',
        main: '#83BD36',
        dark: '#528311',
        darkest: '#2E5002',
        contrastText: '#fff',
    },
    tertiary: {
        pale: '#FCEFE8',
        light: '#FFD7B7',
        main: '#E18C28',
        dark: '#C35F19',
        darkest: '#6C2300',
        contrastText: '#fff',
    },
    grey: {
        pale: '#F8F9FA',
        light: '#E5E6E7',
        main: '#A6A8AB',
        dark: '#58585B',
        darkest: '#121213',
        contrastText: '#fff',
    },
    error: {
        light: '#FAD7D7',
        main: '#CF0D0D',
        dark: '#820000',
    }
}

const theme = createMuiTheme({
    props: {
        MuiTooltip: {
            // enterTouchDelay: 0,
            // leaveTouchDelay: 500,
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'Roboto Light,sans-serif',
        body1: {
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.5,
            '@media (max-width:600px)': {
                fontSize: '0.875rem'
            },
            [breakpoints.down('xs')]: {
                fontSize: '0.6rem',
                lineHeight: '1rem'
            },
        },
        h1: {
            fontWeight: 300,
            fontSize: '3rem',
            lineHeight: 1.25,
            '@media (max-width:600px)': {
                fontSize: '2.4rem'
            },
            '@media (max-width:480px)': {
                fontSize: '2rem'
            }
        },
        h2: {
            fontWeight: 300,
            fontSize: '2.25rem',
            lineHeight: 1.33,
            '@media (max-width:600px)': {
                fontSize: '1.8rem'
            },
            '@media (max-width:480px)': {
                fontSize: '1.5rem'
            }
        },
        h3: {
            fontWeight: 300,
            fontSize: '1.875rem',
            lineHeight: 1.6,
            '@media (max-width:600px)': {
                fontSize: '1.5rem'
            },
            '@media (max-width:480px)': {
                fontSize: '1.3rem'
            }
        },
        h4: {
            fontWeight: 300,
            fontSize: '1.5rem',
            lineHeight: 1.5,
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            }
        },
        h5: {
            fontWeight: 900,
            fontSize: '1.5rem',
            lineHeight: 1.25,
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            }
        },
        h6: {
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1.33,
            '@media (max-width:600px)': {
                fontSize: '1rem'
            }
        },
        // Radio and Checkbox Label
        subtitle1: {
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1.33,
            '@media (max-width:600px)': {
                fontSize: '1rem'
            }
        },
        // Input Labels
        subtitle2: {
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1,
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            },
            [breakpoints.down('xs')]: {
                fontSize: '1rem',
            },
        }
    },
    palette: palette,
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                '@media (max-width:600px)': {
                    fontSize: '0.6rem'
                }
            },
            containedPrimary: {
                color: palette.primary.contrastText,
                backgroundColor: palette.primary.main,
                '&:hover': {
                    backgroundColor: palette.primary.dark,
                },
                '&$disabled': {
                    backgroundColor: palette.primary.pale,
                    color: palette.primary.contrastText
                }
            },
            containedSecondary: {
                color: palette.secondary.contrastText,
                backgroundColor: palette.secondary.main,
                '&:hover': {
                    backgroundColor: palette.secondary.dark,
                },
                '&$disabled': {
                    backgroundColor: palette.secondary.pale,
                    color: palette.secondary.contrastText,
                }
            },
            outlinedPrimary: {
                color: palette.primary.main,
                borderColor: palette.primary.main,
                borderWidth: '2px',
                '&:hover': {
                    backgroundColor: palette.primary.pale,
                    color: palette.primary.dark,
                    borderColor: palette.primary.dark,
                    borderWidth: '2px',
                },
                '&$disabled': {
                    backgroundColor: palette.primary.contrastText,
                    color: palette.primary.pale,
                    borderColor: palette.primary.pale,
                }
            },
            outlinedSecondary: {
                color: palette.secondary.main,
                borderColor: palette.secondary.main,
                borderWidth: '2px',
                '&:hover': {
                    backgroundColor: palette.secondary.pale,
                    color: palette.secondary.dark,
                    borderColor: palette.secondary.dark,
                    borderWidth: '2px',
                },
                '&$disabled': {
                    backgroundColor: palette.secondary.contrastText,
                    color: palette.secondary.pale,
                    borderColor: palette.secondary.pale,
                }
            },
        },
        MuiTextField: {
            root: {
                marginTop: '8px',
                marginBottom: '48px',
                height: '3.75rem',
                [breakpoints.down('xs')]: {
                    marginBottom: '1rem',
                },
            },
        },
        MuiInputBase: {
            root: {
                // height: '3.75rem'
            },
            input: {
                color: palette.grey.dark,
                fontSize: '1.5rem',
                '@media (max-width: 600px)': {
                    fontSize: '1rem'
                },
                [breakpoints.down('xs')]: {
                    fontSize: '.9rem'
                },
            },
        },
        MuiFormHelperText: {
            root: {
                '&$error': {
                    position: 'absolute',
                    top: '4rem',
                },
            }
        },
        MuiTooltip: {
            tooltip: {
                fontSize: '1rem',
                padding: '1rem',
            },
        },
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    }
});

export default theme;
'use client';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    InputBase,
    Menu,
    MenuItem,
    Divider,
    Collapse,
    useMediaQuery,
    Fade,
    alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginIcon from '@mui/icons-material/Login';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    {
        label: 'Categories',
        href: '/categories',
        children: [
            { label: 'Technology', href: '/categories/technology' },
            { label: 'Design', href: '/categories/design' },
            { label: 'Business', href: '/categories/business' },
            { label: 'Lifestyle', href: '/categories/lifestyle' },
        ],
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const theme = useTheme();
    const { mode, toggleMode } = useThemeMode();
    const { isAuthenticated } = useAuth();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(null);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

    const isDark = mode === 'dark';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCategoriesOpen = (e: React.MouseEvent<HTMLElement>) => setCategoriesAnchor(e.currentTarget);
    const handleCategoriesClose = () => setCategoriesAnchor(null);

    const logoGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #c084fc 50%, #e879f9 100%)`;

    const navLinkSx = {
        color: theme.palette.text.secondary,
        fontWeight: 500,
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
        px: 1.5,
        py: 0.75,
        borderRadius: 1.5,
        transition: 'all 0.2s ease',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: scrolled
                        ? alpha(theme.palette.background.default, 0.85)
                        : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled
                        ? `1px solid ${theme.palette.divider}`
                        : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, minHeight: { xs: 64, md: 70 } }}>

                    {/* Logo */}
                    <NextLink href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <Box
                            sx={{
                                background: logoGradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontFamily: '"Playfair Display", Georgia, serif',
                                fontWeight: 800,
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                letterSpacing: '-0.02em',
                                lineHeight: 1,
                                userSelect: 'none',
                            }}
                        >
                            MyBlog
                        </Box>
                    </NextLink>

                    {/* Desktop Nav */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 5, flex: 1 }}>
                            {NAV_LINKS.map((link) =>
                                link.children ? (
                                    <Box key={link.label}>
                                        <Button
                                            endIcon={
                                                <KeyboardArrowDownIcon
                                                    sx={{
                                                        transition: 'transform 0.2s',
                                                        transform: Boolean(categoriesAnchor) ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        fontSize: '1rem !important',
                                                    }}
                                                />
                                            }
                                            onClick={handleCategoriesOpen}
                                            sx={navLinkSx}
                                        >
                                            {link.label}
                                        </Button>
                                        <Menu
                                            anchorEl={categoriesAnchor}
                                            open={Boolean(categoriesAnchor)}
                                            onClose={handleCategoriesClose}
                                            TransitionComponent={Fade}
                                            PaperProps={{
                                                elevation: 8,
                                                sx: {
                                                    mt: 1,
                                                    minWidth: 180,
                                                    backgroundColor: theme.palette.background.paper,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 2,
                                                    overflow: 'visible',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: -6,
                                                        left: 24,
                                                        width: 12,
                                                        height: 12,
                                                        backgroundColor: theme.palette.background.paper,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        borderBottom: 'none',
                                                        borderRight: 'none',
                                                        transform: 'rotate(45deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {link.children.map((child) => (
                                                <MenuItem
                                                    key={child.label}
                                                    component={NextLink}
                                                    href={child.href}
                                                    onClick={handleCategoriesClose}
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        py: 1,
                                                        px: 2,
                                                        color: theme.palette.text.secondary,
                                                        transition: 'all 0.15s',
                                                        '&:hover': {
                                                            color: theme.palette.primary.main,
                                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                        },
                                                    }}
                                                >
                                                    {child.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Button
                                        key={link.label}
                                        component={NextLink}
                                        href={link.href}
                                        sx={navLinkSx}
                                    >
                                        {link.label}
                                    </Button>
                                )
                            )}
                        </Box>
                    )}

                    {!isMobile && <Box sx={{ flex: 1 }} />}

                    {/* Desktop Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

                        {/* Search */}
                        <Fade in={searchOpen}>
                            <InputBase
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search articles..."
                                sx={{
                                    display: searchOpen ? 'flex' : 'none',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.5,
                                    fontSize: '0.875rem',
                                    width: { xs: 140, md: 200 },
                                    transition: 'all 0.3s ease',
                                    color: theme.palette.text.primary,
                                    '& input::placeholder': { color: theme.palette.text.secondary },
                                }}
                                onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                                autoFocus={searchOpen}
                            />
                        </Fade>
                        <IconButton
                            onClick={() => setSearchOpen((prev) => !prev)}
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': { color: theme.palette.primary.main, backgroundColor: alpha(theme.palette.primary.main, 0.08) },
                                transition: 'all 0.2s',
                            }}
                        >
                            {searchOpen ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                        </IconButton>

                        {/* Theme Toggle */}
                        <IconButton
                            onClick={toggleMode}
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': { color: theme.palette.primary.main, backgroundColor: alpha(theme.palette.primary.main, 0.08) },
                                transition: 'all 0.2s',
                            }}
                        >
                            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                        </IconButton>

                        {/* Login Button (if not authenticated) */}
                        {!isAuthenticated && !isMobile && (
                            <Button
                                component={NextLink}
                                href="/admin/login"
                                variant="contained"
                                startIcon={<LoginIcon />}
                                size="small"
                                sx={{
                                    ml: 1,
                                    px: 2,
                                    py: 0.75,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, #7c3aed)`,
                                    boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.35)}`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, #a855f7, #6d28d9)`,
                                        boxShadow: `0 0 28px ${alpha(theme.palette.primary.main, 0.5)}`,
                                        transform: 'translateY(-1px)',
                                    },
                                    transition: 'all 0.2s ease',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                }}
                            >
                                Login
                            </Button>
                        )}

                        {/* Mobile Hamburger */}
                        {isMobile && (
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                size="small"
                                sx={{
                                    ml: 0.5,
                                    color: theme.palette.text.primary,
                                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) },
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        backgroundColor: theme.palette.background.default,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Box
                        sx={{
                            background: logoGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontWeight: 800,
                            fontSize: '1.4rem',
                        }}
                    >
                        MyBlog
                    </Box>
                    <IconButton onClick={() => setMobileOpen(false)} size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* Mobile Search */}
                <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <InputBase
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search articles..."
                        startAdornment={<SearchIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />}
                        fullWidth
                        sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.75,
                            fontSize: '0.875rem',
                            color: theme.palette.text.primary,
                        }}
                    />
                </Box>

                <List sx={{ px: 1, py: 1.5, flex: 1 }}>
                    {NAV_LINKS.map((link) => (
                        <React.Fragment key={link.label}>
                            {link.children ? (
                                <>
                                    <ListItemButton
                                        onClick={() => setMobileCategoriesOpen((p) => !p)}
                                        sx={{ borderRadius: 1.5, mb: 0.25 }}
                                    >
                                        <ListItemText
                                            primary={link.label}
                                            primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                                        />
                                        <ExpandMoreIcon
                                            sx={{
                                                fontSize: '1.1rem',
                                                transition: 'transform 0.2s',
                                                transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'none',
                                                color: theme.palette.text.secondary,
                                            }}
                                        />
                                    </ListItemButton>
                                    <Collapse in={mobileCategoriesOpen}>
                                        <List disablePadding sx={{ pl: 2 }}>
                                            {link.children.map((child) => (
                                                <ListItemButton
                                                    key={child.label}
                                                    component={NextLink}
                                                    href={child.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    sx={{ borderRadius: 1.5, mb: 0.25 }}
                                                >
                                                    <ListItemText
                                                        primary={child.label}
                                                        primaryTypographyProps={{ fontSize: '0.875rem', color: theme.palette.text.secondary }}
                                                    />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            ) : (
                                <ListItemButton
                                    component={NextLink}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    sx={{ borderRadius: 1.5, mb: 0.25 }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                                    />
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    ))}
                </List>

                <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                    {!isAuthenticated && (
                        <Button
                            component={NextLink}
                            href="/admin/login"
                            variant="contained"
                            fullWidth
                            startIcon={<LoginIcon />}
                            onClick={() => setMobileOpen(false)}
                            sx={{
                                mb: 1.5,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, #7c3aed)`,
                                fontWeight: 600,
                            }}
                        >
                            Login
                        </Button>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ fontSize: '0.8rem', color: theme.palette.text.secondary }}>
                            {isDark ? 'Dark Mode' : 'Light Mode'}
                        </Box>
                        <IconButton onClick={toggleMode} size="small">
                            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
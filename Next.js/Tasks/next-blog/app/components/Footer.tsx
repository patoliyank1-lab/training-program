'use client';
import React, { useState } from 'react';
import NextLink from 'next/link';
import {
    Box,
    Container,
    Typography,
    Grid,
    IconButton,
    InputBase,
    Button,
    Divider,
    useTheme,
    alpha,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import RssFeedIcon from '@mui/icons-material/RssFeed';

const QUICK_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const SOCIAL_LINKS = [
    { icon: <TwitterIcon />, label: 'Twitter', href: 'https://twitter.com' },
    { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email && email.includes('@')) {
            setSubscribed(true);
            setEmail('');
        }
    };

    const logoGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #c084fc 50%, #e879f9 100%)`;
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: isDark ? '#0a0a0d' : '#faf5ff',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '300px',
                    background: `radial-gradient(ellipse, ${alpha(theme.palette.primary.main, isDark ? 0.07 : 0.05)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                },
            }}
        >
            {/* Newsletter Bar */}
            <Box
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: { xs: 3, md: 4 },
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha('#7c3aed', 0.04)})`,
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                            gap: { xs: 2, md: 4 },
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <RssFeedIcon sx={{ color: theme.palette.primary.main, fontSize: '1.1rem' }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"Playfair Display", Georgia, serif',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Stay in the loop
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Get the latest articles delivered straight to your inbox.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                width: { xs: '100%', md: 'auto' },
                                gap: 1,
                            }}
                        >
                            {subscribed ? (
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    ✓ You are subscribed! Thanks.
                                </Typography>
                            ) : (
                                <>
                                    <InputBase
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                                        sx={{
                                            flex: 1,
                                            minWidth: { xs: 0, md: 260 },
                                            backgroundColor: theme.palette.background.default,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 2,
                                            px: 2,
                                            py: 0.75,
                                            fontSize: '0.875rem',
                                            color: theme.palette.text.primary,
                                            '&:focus-within': {
                                                borderColor: theme.palette.primary.main,
                                                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
                                            },
                                            transition: 'all 0.2s',
                                        }}
                                    />
                                    <Button
                                        onClick={handleSubscribe}
                                        variant="contained"
                                        endIcon={<SendIcon sx={{ fontSize: '0.9rem !important' }} />}
                                        sx={{
                                            px: 2.5,
                                            whiteSpace: 'nowrap',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, #7c3aed)`,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, #a855f7, #6d28d9)`,
                                                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                                            },
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
                <Grid container spacing={{ xs: 4, md: 6 }}>

                    {/* Column 1: Logo + Description */}
                    <Grid item xs={12} md={5}>
                        <NextLink href="/" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    background: logoGradient,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontFamily: '"Playfair Display", Georgia, serif',
                                    fontWeight: 800,
                                    fontSize: '1.75rem',
                                    letterSpacing: '-0.02em',
                                    display: 'inline-block',
                                    mb: 1.5,
                                }}
                            >
                                MyBlog
                            </Box>
                        </NextLink>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                lineHeight: 1.75,
                                maxWidth: 320,
                                mb: 3,
                            }}
                        >
                            A space for curious minds — exploring ideas in technology, design, business, and beyond.
                            Written with care, curated with purpose.
                        </Typography>

                        {/* Social Icons */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {SOCIAL_LINKS.map((social) => (
                                <IconButton
                                    key={social.label}
                                    component="a"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    size="small"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 1.5,
                                        p: 0.85,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                            borderColor: theme.palette.primary.main,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Spacer on desktop */}
                    <Grid item xs={0} md={1} sx={{ display: { xs: 'none', md: 'block' } }} />

                    {/* Column 2: Quick Links */}
                    <Grid item xs={6} md={3}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                letterSpacing: '0.12em',
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {QUICK_LINKS.map((link) => (
                                <NextLink key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontWeight: 400,
                                            transition: 'all 0.15s',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            '&:hover': {
                                                color: theme.palette.primary.main,
                                                transform: 'translateX(4px)',
                                            },
                                            '&::before': {
                                                content: '"→"',
                                                marginRight: '6px',
                                                fontSize: '0.75rem',
                                                opacity: 0,
                                                transition: 'opacity 0.15s',
                                            },
                                            '&:hover::before': {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Typography>
                                </NextLink>
                            ))}
                        </Box>
                    </Grid>

                    {/* Column 3: Follow Us */}
                    <Grid item xs={6} md={3}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                letterSpacing: '0.12em',
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {SOCIAL_LINKS.map((social) => (
                                <Box
                                    key={social.label}
                                    component="a"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: theme.palette.text.secondary,
                                        textDecoration: 'none',
                                        transition: 'all 0.15s',
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                            transform: 'translateX(3px)',
                                        },
                                    }}
                                >
                                    <Box sx={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                                        {social.icon}
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 400 }}>
                                        {social.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Bottom Bar */}
            <Divider sx={{ borderColor: theme.palette.divider }} />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: 2.5,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        © {new Date().getFullYear()} MyBlog. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2.5 }}>
                        {['Privacy Policy', 'Terms of Use'].map((item) => (
                            <NextLink key={item} href="#" style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        transition: 'color 0.15s',
                                        '&:hover': { color: theme.palette.primary.main },
                                    }}
                                >
                                    {item}
                                </Typography>
                            </NextLink>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

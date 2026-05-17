export const colorMap = [
    { color: '#6C63FF', bg: '#EDE9FF' },
    { color: '#FF6B9D', bg: '#FFE0EC' },
    { color: '#FF8A65', bg: '#FFF3E0' },
    { color: '#6BCB77', bg: '#E8F5E9' },
    { color: '#4FC3F7', bg: '#E0F4FF' },
    { color: '#BA68C8', bg: '#F3E5F5' },
];

export const samplePosts = [
    {
        id: 'sample-1',
        title: 'When Should My Child Have Their First Dental Visit?',
        excerpt: 'Many parents wonder when to schedule their child\'s first dental appointment. The answer might surprise you — it\'s earlier than you think! Learn why early visits set the foundation for a lifetime of healthy smiles.\n\nThe American Academy of Pediatric Dentistry recommends that a child go to the dentist by age 1 or within six months after the first tooth erupts. Primary teeth typically begin growing in around 6 months of age.\n\nEarly visits help ensure that the teeth are developing normally and allows the dentist to provide advice on proper oral hygiene. It also helps the child get comfortable with visiting the dentist early on, reducing dental anxiety later in life.',
        author: 'Dr. R. Midhunraj',
        date: 'May 10, 2026',
        category: 'Preventive Care',
        readTime: '3 min read',
        emoji: '🦷',
        color: '#6C63FF',
        bg: '#EDE9FF',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'sample-2',
        title: 'How to Make Brushing Fun for Your Kids',
        excerpt: 'Getting your child to brush their teeth can feel like a battle every night. Discover playful tips, fun routines, and the right tools that turn brushing into the highlight of their bedtime routine.\n\nStart by letting them pick their own toothbrush and toothpaste. Often, a toothbrush featuring their favorite cartoon character or a fun flavor of toothpaste can make all the difference.\n\nTurn brushing into a game! Play a 2-minute song and challenge them to brush until the song is over. You can also use a sticker chart to reward them for consistent brushing. Remember, your enthusiastic participation is the best motivation.',
        author: 'Dr. K. Pavithra',
        date: 'April 28, 2026',
        category: 'Oral Hygiene Tips',
        readTime: '4 min read',
        emoji: '✨',
        color: '#FF6B9D',
        bg: '#FFE0EC',
        imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'sample-3',
        title: 'Understanding Tongue Tie in Newborns',
        excerpt: 'Tongue tie (ankyloglossia) can affect breastfeeding, speech, and overall development. We explain the signs to look out for, how it\'s diagnosed, and what laser treatment involves.\n\nA tongue tie occurs when the strip of tissue connecting the tongue to the floor of the mouth is shorter, thicker, or tighter than usual. This can restrict the tongue\'s range of motion.\n\nSigns in babies include difficulty latching, clicking sounds while feeding, and poor weight gain. Fortunately, treatment is a simple, quick procedure called a frenotomy, which we perform using precise and virtually painless laser technology.',
        author: 'Dr. R. Midhunraj',
        date: 'April 15, 2026',
        category: 'Specialist Care',
        readTime: '5 min read',
        emoji: '❤️',
        color: '#FF8A65',
        bg: '#FFF3E0',
        imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    },
];

export function getCustomPosts() {
    const saved = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
    return saved.map((post, idx) => ({
        ...post,
        color: colorMap[idx % colorMap.length].color,
        bg: colorMap[idx % colorMap.length].bg,
    }));
}

export function getAllPosts() {
    return [...getCustomPosts(), ...samplePosts];
}

export function getPostById(id) {
    const all = getAllPosts();
    // Use loose equality because route params are strings, but custom IDs are numbers
    return all.find(p => String(p.id) === String(id));
}

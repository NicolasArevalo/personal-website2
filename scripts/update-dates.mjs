import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

const dateMap = {
    'Arcoiris.md': '2023-08-26',
    'La_música.md': '2022-11-18',
    'Cielo,_limbo,_infierno.md': '2022-08-08',
    'La_tecnología_es_y_será.md': '2022-06-04',
    'El_miedo.md': '2020-07-11',
    'Conciencia.md': '2022-11-02',
    'La_magia_de_preguntar.md': '2023-02-17',
    'Fugaz.md': '2023-11-06',
    'Estelar.md': '2023-11-14',
    'Chlorine.md': '2024-02-17',
    'Calma.md': '2023-10-15',
    'Where_is_my_creativity_coming_from.md': '2024-03-12',
    'Killer.md': '2025-02-09',
    'Libertad.md': '2025-03-26',
    'Tommy.md': '2025-09-01',
    'Hamán_secreto.md': '2025-10-25',
    'El_jardín_de_tus_letras.md': '2026-01-28',
    'La_belleza.md': '2017-06-20',
    'Describir.md': '2023-10-08',
};

async function updateDates() {
    for (const [filename, dateStr] of Object.entries(dateMap)) {
        const filePath = path.join(BLOG_DIR, filename);
        try {
            const rawContent = await fs.readFile(filePath, 'utf-8');
            const parsed = matter(rawContent);
            let { data, content } = parsed;

            data.date = new Date(dateStr);

            const updatedFileContent = matter.stringify(content, data);
            await fs.writeFile(filePath, updatedFileContent, 'utf-8');
            console.log(`✅ Date updated for: ${filename}`);
        } catch (e) {
            console.log(`❌ Error for ${filename}:`, e.message);
        }
    }
}

updateDates();

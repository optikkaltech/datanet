import { useEffect } from 'react';

const SEO = ({ title, description, robots }) => {
    useEffect(() => {
        const baseTitle = "Datanet Global";
        document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Elite IT & Security Infrastructure`;

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            }
        }

        if (robots) {
            let metaRobots = document.querySelector('meta[name="robots"]');
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.setAttribute('name', 'robots');
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute('content', robots);
        }
    }, [title, description, robots]);

    return null;
};

export default SEO;

import IntroBlock from './intro.block'
import TitleBlock from './title-block'
import PrecisBlock from './precis-block'
import GalleryBlock from './gallery-block'
import TestimonialBlock from './testimonial-block'

interface Props {
  block: any
}

const Renderer = ({ block }: Props): React.ReactElement => {
  switch (block.acfFcLayout) {
    case 'intro_block':
      return <IntroBlock body={block.blockBody} />
    case 'title_block':
      return <TitleBlock title={block.blockTitle} body={block.blockBody} />
    case 'precis_block':
      return <PrecisBlock services={block.serviceList} technologies={block.technologyList} />
    case 'gallery_block':
      return <GalleryBlock images={block.blockGallery} caption={block.blockNote} />
    case 'testimonial_block':
      return <TestimonialBlock testimonial={block.testimonial} />
    default:
      return null
  }
}

export default Renderer

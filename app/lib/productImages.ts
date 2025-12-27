import type { StaticImageData } from 'next/image';

// Local product images
import ceramicVase from '../../public/assets/products/ceramic-vase.jpg';
import scentedCandle from '../../public/assets/products/scented-candle.jpg';
import linenThrow from '../../public/assets/products/linen-throw.jpg';
import woodenBoard from '../../public/assets/products/wooden-board.jpg';
import bathTowels from '../../public/assets/products/bath-towels.jpg';
import ceramicMug from '../../public/assets/products/ceramic-mug.jpg';
import deskLamp from '../../public/assets/products/desk-lamp.jpg';
import roomSpray from '../../public/assets/products/room-spray.jpg';

// Map product slugs → images
const productImages: Record<string, StaticImageData> = {
  'terracotta-ceramic-vase': ceramicVase,
  'lavender-scented-candle': scentedCandle,
  'linen-throw-blanket': linenThrow,
  'olive-wood-serving-board': woodenBoard,
  'sage-bath-towel-set': bathTowels,
  'speckled-ceramic-mug': ceramicMug,
  'brass-desk-lamp': deskLamp,
  'botanical-room-spray': roomSpray,
};

export function getProductImage(
  slug: string,
  fallback?: StaticImageData
): StaticImageData | undefined {
  return productImages[slug] || fallback;
}

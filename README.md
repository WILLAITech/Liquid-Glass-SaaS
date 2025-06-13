# Liquid Glass SaaS

Introducing liquid glass design into SaaS Webpage. A modern React/TypeScript UI library that provides stunning liquid glass visual effects for web applications. Transform ordinary UI components into premium, depth-rich interfaces with minimal effort.


# Live Demo (In development)
https://www.liquidglassstyle.com/

# Demo Video
https://github.com/user-attachments/assets/f4d34886-2c94-4c88-98a0-8754a3a805a8




## ✨ Features

- 🔮 **Liquid Glass Effect**: Create beautiful liquid glass, blur, and gradient effects
- 🧩 **Component Library**: Ready-to-use React components with liquid glass styling
- 🎨 **Customizable**: Extensive styling options and shader customization
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🔧 **Framework Agnostic**: Support for React, Vue, and vanilla CSS
- ⚡ **Performance Optimized**: Efficient rendering with minimal performance impact

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/WILLAITech/Liquid-Glass-SaaS.git
cd Liquid-Glass-SaaS

# Install dependencies
npm install
# or
yarn install
```


### Development

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

### Generate Icons

```bash
npm run generate-icons
# or
yarn generate-icons
```

This will generate all necessary icon files based on `public/favicon.svg`, including favicon.ico, PWA icons, and social media sharing images.

## 📖 Usage Guide

### Basic Component Usage

```tsx
import { VanillaLiquidGlass } from 'liquid-glass';

function MyComponent() {
  return (
    <VanillaLiquidGlass 
      width={400} 
      height={300} 
      borderRadius={20}
      draggable={true}
    >
      <div className="p-6 text-white">
        <h2 className="text-xl font-bold">Liquid Glass Effect</h2>
        <p>Beautiful liquid glass UI component</p>
      </div>
    </VanillaLiquidGlass>
  );
}
```

### AI Transformation Tool

1. **Upload Design**: Drag and drop or select a UI design image
2. **Select Framework**: Choose React, Vue, or CSS output format
3. **Transform**: Click "Transform to Liquid Glass" to process
4. **Use Generated Code**: Copy the code and integrate it into your project

### Available Components

- `VanillaLiquidGlass`: Core component for creating liquid glass effects
- `LiquidGlassCard`: Pre-styled card with liquid glass effect
- `LiquidGlassButton`: Interactive button with liquid glass styling
- `LiquidGlassBackground`: Full-screen animated background
- `LiquidGlassHeaderDecoration`: Decorative header element

## 🛠️ Technical Architecture

### Tech Stack

- **Framework**: Next.js 13 (App Router)
- **UI**: Tailwind CSS + Radix UI
- **Language**: TypeScript
- **AI Integration**: OpenAI Compatible APIs
- **Image Processing**: Canvas API + File API

### Project Structure

```
liquid-glass-saas/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── VanillaLiquidGlass.tsx  # Core glass effect component
│   ├── LiquidGlassCard.tsx     # Card component
│   ├── LiquidGlassButton.tsx   # Button component
│   ├── Transform.tsx      # Image transformation component
│   ├── Showcase.tsx       # Demo showcase component
│   └── ...               # Other UI components
├── lib/                   # Utility functions
│   ├── config.ts         # Configuration
│   ├── imageUtils.ts     # Image processing utilities
│   └── mockData.ts       # Mock data for demos
├── public/                # Static assets
├── scripts/               # Tool scripts
└── types/                 # TypeScript type definitions
```


## 📚 API Reference

### VanillaLiquidGlass Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `300` | Width in pixels |
| `height` | `number` | `200` | Height in pixels |
| `borderRadius` | `number` | `16` | Border radius in pixels |
| `draggable` | `boolean` | `true` | Enable dragging |
| `fixed` | `boolean` | `false` | Fix position (disable dragging) |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Additional inline styles |
| `children` | `ReactNode` | - | Content to display inside |
| `fragment` | `Function` | Default shader | Custom shader function |

### Custom Shader Function

```tsx
const customFragment = (uv: UV, mouse: Mouse) => {
  const ix = uv.x - 0.5;
  const iy = uv.y - 0.5;
  
  // Mouse interaction
  const mouseX = (mouse.x - 0.5) * 0.1;
  const mouseY = (mouse.y - 0.5) * 0.1;
  
  // Add effects
  const time = Date.now() * 0.001;
  const wave = Math.sin(time + Math.sqrt(ix*ix + iy*iy) * 10) * 0.02;
  
  return {
    type: 't',
    x: ix + mouseX + wave + 0.5,
    y: iy + mouseY + wave + 0.5
  };
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide React](https://lucide.dev/) - Icon library
- [OpenAI](https://openai.com/) - AI service provider
- https://github.com/shuding/liquid-glass
- https://github.com/rdev/liquid-glass-react
- https://github.com/lucasromerodb/liquid-glass-effect-macos


---

Built with ❤️ by WILLAITech

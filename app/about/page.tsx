import Navigation from '../components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="about" />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Flashcard App
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A modern, interactive learning platform designed to make studying more engaging and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To provide students, educators, and lifelong learners with an intuitive and powerful tool 
              for creating, organizing, and studying flashcards. We believe that effective learning 
              should be accessible, engaging, and personalized.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🌟</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To revolutionize the way people learn by combining modern technology with proven 
              study techniques. We envision a world where learning is not just efficient, but 
              enjoyable and accessible to everyone.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-800 mb-2">3D Card Animation</h3>
              <p className="text-sm text-gray-600">Smooth, interactive card flipping for engaging study sessions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600">Study anywhere on any device - mobile, tablet, or desktop</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Search</h3>
              <p className="text-sm text-gray-600">Find content instantly with real-time search across all cards</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-sm text-gray-600">Visual progress indicators to monitor your study advancement</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">🎲</div>
              <h3 className="font-semibold text-gray-800 mb-2">Study Modes</h3>
              <p className="text-sm text-gray-600">Sequential and random modes to suit different learning styles</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">💾</div>
              <h3 className="font-semibold text-gray-800 mb-2">Data Persistence</h3>
              <p className="text-sm text-gray-600">All your content is safely stored in a robust MySQL database</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">⚛️</div>
              <h3 className="font-semibold text-gray-800">Next.js 14</h3>
              <p className="text-sm text-gray-600">React Framework</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold text-gray-800">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Styling Framework</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🗄️</div>
              <h3 className="font-semibold text-gray-800">MySQL</h3>
              <p className="text-sm text-gray-600">Database</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-800">TypeScript</h3>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
          </div>
        </div>

        {/* Team/Development */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Development</h2>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              This flashcard application was built with modern web technologies and best practices. 
              It&apos;s designed to be scalable, maintainable, and user-friendly.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-800">Performance</h3>
                <p className="text-sm text-gray-600">Optimized for speed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-800">Security</h3>
                <p className="text-sm text-gray-600">Safe and secure</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">♿</div>
                <h3 className="font-semibold text-gray-800">Accessibility</h3>
                <p className="text-sm text-gray-600">Inclusive design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
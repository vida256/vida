import { Footer } from '@/widgets/layout';
import { Calendar, ChevronRight, Filter, MapPin, Tag, TrendingUp, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { projectCategories, projectsData, projectStats } from '../data/projectsData';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" />
      <div 
        className="relative bg-white rounded-3xl shadow-xl w-full max-w-4xl mx-auto my-8 animate-scale-in overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-200 shadow-soft"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/img/default-project.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-medium">
              Featured Project
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-6 right-20 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{project.region}</span>
            </div>
            <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
              {project.contractAmount}
            </div>
          </div>

          {/* Title and Client */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
          <p className="text-lg text-primary-600 font-medium mb-6">{project.client}</p>

          {/* Full Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Focus Areas</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/contact"
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3 rounded-xl font-medium text-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Start Similar Project
            </NavLink>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, isVisible, onViewDetails }) => {
  // Truncate description to about 100 characters
  const truncatedDescription = project.description.length > 120 
    ? project.description.substring(0, 120) + '...'
    : project.description;

  return (
    <div 
      className={`group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-gray-100/50 hover:border-primary-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden ${project.featured ? 'h-64' : 'h-48'}`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = '/img/default-project.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-medium">
            Featured
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
          {project.category}
        </div>
        
        {/* Contract Amount */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-medium">
          <div className="text-xs text-gray-600 mb-1">Contract Value</div>
          <div className="text-sm font-bold text-gray-900">{project.contractAmount}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{project.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{project.region}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Client */}
        <div className="text-sm text-primary-600 font-medium mb-3">
          {project.client}
        </div>

        {/* Truncated Description */}
        <p className="text-gray-600 leading-relaxed mb-4 text-xs">
          {truncatedDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-xs text-gray-400">+{project.tags.length - 2} more</span>
          )}
        </div>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onViewDetails(project)}
            className="group/btn text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-all duration-200"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
          
          <div className="text-xs text-gray-400">
            {project.featured ? 'Featured Project' : 'Case Study'}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon: Icon, value, label, delay, isVisible }) => (
  <div 
    className={`text-center transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl mb-4 hover:scale-110 transition-transform duration-300 shadow-large">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{value}</div>
    <div className="text-white/80 text-sm font-medium tracking-wide">{label}</div>
  </div>
);

const ModernProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [visibleCards, setVisibleCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Trigger stats animation
    const statsTimer = setTimeout(() => {
      setStatsVisible(true);
    }, 500);
    // Trigger cards animation
    const cardsTimer = setTimeout(() => {
      setVisibleCards(Array.from({ length: projectsData.length }, (_, i) => i));
    }, 800);
    
    return () => {
      clearTimeout(statsTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  const filteredProjects = selectedCategory === 'All Projects'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-600/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 mr-2 text-white" />
              <span className="text-white/90 text-sm font-medium">Our Project Portfolio</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Transforming Communities
              <span className="block text-primary-400">Through Impact</span>
            </h1>
            
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive portfolio of projects across Uganda, driving financial inclusion, 
              agricultural development, and community empowerment since 2018.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard icon={TrendingUp} value={projectStats.totalProjects} label="Projects Completed" delay={0} isVisible={statsVisible} />
            <StatsCard icon={Calendar} value={projectStats.yearsActive} label="Years Active" delay={200} isVisible={statsVisible} />
            <StatsCard icon={MapPin} value={projectStats.regionsServed} label="Regions Served" delay={400} isVisible={statsVisible} />
            <StatsCard icon={Tag} value={projectStats.totalValue} label="Total Value" delay={600} isVisible={statsVisible} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filter by Category</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-medium hover:shadow-large'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProjects.length} of {projectsData.length} projects
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-600 to-primary-500 rounded-full"></span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={visibleCards.includes(index)}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-accent-600 to-accent-500 rounded-full"></span>
            {selectedCategory === 'All Projects' ? 'All Projects' : selectedCategory}
          </h2>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different category to view projects.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'All Projects' ? regularProjects : filteredProjects.filter(p => !p.featured)).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                  isVisible={visibleCards.includes(index + featuredProjects.length)}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and let's create meaningful impact together. 
            Our team is ready to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Start a Project
            </NavLink>
            <NavLink
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Services
            </NavLink>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Footer />
    </div>
  );
};

export default ModernProjects; 
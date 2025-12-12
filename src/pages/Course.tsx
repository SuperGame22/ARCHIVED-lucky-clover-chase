import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Play, Pause, ChevronLeft, ChevronRight, Gauge, Eye } from "lucide-react";

interface Course {
  id: string;
  name: string;
  city: string;
  holes: number;
}

const mockCourses: Course[] = [
  { id: "1", name: "Pebble Beach Golf Links", city: "Pebble Beach, CA", holes: 18 },
  { id: "2", name: "Augusta National Golf Club", city: "Augusta, GA", holes: 18 },
  { id: "3", name: "St. Andrews Links", city: "St. Andrews, Scotland", holes: 18 },
  { id: "4", name: "TPC Sawgrass", city: "Ponte Vedra Beach, FL", holes: 18 },
  { id: "5", name: "Torrey Pines Golf Course", city: "San Diego, CA", holes: 18 },
];

const Course = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showHoleMap, setShowHoleMap] = useState(false);

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedHole(null);
    setShowHoleMap(true);
  };

  const handleHoleSelect = (hole: number) => {
    setSelectedHole(hole);
    setIsPlaying(true);
    setShowHoleMap(false);
  };

  const handleSpeedChange = (delta: number) => {
    setPlaybackSpeed((prev) => Math.max(0.25, Math.min(3, prev + delta)));
  };

  const goBack = () => {
    if (selectedHole !== null) {
      setSelectedHole(null);
      setShowHoleMap(true);
      setIsPlaying(false);
    } else if (selectedCourse) {
      setSelectedCourse(null);
      setShowHoleMap(false);
    }
  };

  return (
    <AppLayout>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <div className="relative flex-1 max-w-lg mx-auto px-4 py-6 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            {(selectedCourse || selectedHole !== null) && (
              <Button variant="ghost" size="icon" onClick={goBack}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex-1">
              <h1 className="text-xl font-display font-bold">Course Flyover</h1>
              <p className="text-sm text-muted-foreground">
                {selectedCourse
                  ? selectedHole !== null
                    ? `Hole ${selectedHole}`
                    : "Select a hole"
                  : "Search for a course"}
              </p>
            </div>
            {selectedCourse && !selectedHole && (
              <Button
                variant="glass"
                size="sm"
                onClick={() => setShowHoleMap(!showHoleMap)}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {showHoleMap ? "List" : "Map"}
              </Button>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Search Screen */}
            {!selectedCourse && (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by course name or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2">
                  {filteredCourses.map((course) => (
                    <motion.button
                      key={course.id}
                      onClick={() => handleCourseSelect(course)}
                      className="w-full glass-card p-4 text-left hover:bg-primary/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.city}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Hole Selection - Map View */}
            {selectedCourse && showHoleMap && !selectedHole && (
              <motion.div
                key="holemap"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="glass-card p-4">
                  <p className="font-semibold mb-2">{selectedCourse.name}</p>
                  <p className="text-sm text-muted-foreground mb-4">Tap a hole to start flyover</p>
                  
                  {/* Bird's eye course map representation */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 via-lucky-emerald/10 to-primary/20 rounded-xl overflow-hidden">
                    {/* Simulated fairways */}
                    <div className="absolute inset-4">
                      {[...Array(18)].map((_, i) => {
                        const row = Math.floor(i / 6);
                        const col = i % 6;
                        return (
                          <motion.button
                            key={i}
                            onClick={() => handleHoleSelect(i + 1)}
                            className="absolute w-12 h-12 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                            style={{
                              left: `${col * 16 + 4}%`,
                              top: `${row * 30 + 8}%`,
                            }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {i + 1}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Hole list alternative */}
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(selectedCourse.holes)].map((_, i) => (
                    <Button
                      key={i}
                      variant="glass"
                      size="sm"
                      onClick={() => handleHoleSelect(i + 1)}
                      className="aspect-square"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Flyover Player */}
            {selectedHole !== null && (
              <motion.div
                key="flyover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Video Player */}
                <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    src="/videos/hole-flyover-example.mov"
                    autoPlay={isPlaying}
                    loop
                    muted
                    playsInline
                    ref={(video) => {
                      if (video) {
                        video.playbackRate = playbackSpeed;
                        if (isPlaying) {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }
                    }}
                  />
                  
                  {/* Overlay info */}
                  <div className="absolute top-4 left-4 glass-card px-3 py-1.5">
                    <p className="text-sm font-semibold">Hole {selectedHole}</p>
                    <p className="text-xs text-muted-foreground">Par 4 • 425 yds</p>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedHole(Math.max(1, selectedHole - 1))}
                      disabled={selectedHole === 1}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="gold"
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Play
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedHole(Math.min(18, selectedHole + 1))}
                      disabled={selectedHole === 18}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Speed Control - Gas Pedal Style */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Speed</span>
                      </div>
                      <span className="text-sm font-semibold">{playbackSpeed.toFixed(2)}x</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => handleSpeedChange(-0.25)}
                        disabled={playbackSpeed <= 0.25}
                      >
                        -
                      </Button>
                      
                      {/* Speed bar */}
                      <div className="flex-1 h-8 bg-muted/50 rounded-full overflow-hidden relative">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-lucky-emerald to-accent rounded-full"
                          animate={{ width: `${(playbackSpeed / 3) * 100}%` }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-foreground drop-shadow-sm">
                            {playbackSpeed <= 0.5 ? "🐢" : playbackSpeed >= 2 ? "🏎️" : "🚗"}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => handleSpeedChange(0.25)}
                        disabled={playbackSpeed >= 3}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hole selector strip */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4">
                  {[...Array(18)].map((_, i) => (
                    <Button
                      key={i}
                      variant={selectedHole === i + 1 ? "default" : "glass"}
                      size="sm"
                      onClick={() => handleHoleSelect(i + 1)}
                      className="min-w-[2.5rem] aspect-square flex-shrink-0"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
};

export default Course;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SKILLS } from '../constants';

const SkillsViz: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Neon color palette
  const colors = [
    '#2997ff', // Apple Blue
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
  ];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const width = dimensions.width;
    const height = dimensions.height;
    
    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("cursor", "move");

    // Add Glow Filters
    const defs = svg.append("defs");
    
    // Glow for lines
    const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    
    filter.append("feGaussianBlur")
        .attr("stdDeviation", "2.5")
        .attr("result", "coloredBlur");
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Container for zoom
    const g = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom as any)
       .on("dblclick.zoom", () => {
           svg.transition().duration(750).call(zoom.transform as any, d3.zoomIdentity);
       });

    // Data Preparation
    interface NodeType extends d3.SimulationNodeDatum {
      id: string;
      group: 'root' | 'category' | 'skill';
      radius: number;
      color: string;
      x?: number;
      y?: number;
    }
    interface LinkType extends d3.SimulationLinkDatum<NodeType> {
        source: string | NodeType;
        target: string | NodeType;
        value: number;
        isNeural?: boolean; 
    }

    const rootNode: NodeType = { id: "Mudassir", group: "root", radius: 50, color: "#ffffff" };
    let nodes: NodeType[] = [rootNode];
    let links: LinkType[] = [];

    SKILLS.forEach((cat, catIndex) => {
        const catColor = colors[catIndex % colors.length];
        const catNode: NodeType = { 
            id: cat.name, 
            group: "category", 
            radius: 28, 
            color: catColor 
        };
        nodes.push(catNode);
        links.push({ source: "Mudassir", target: cat.name, value: 4, isNeural: false });

        cat.skills.forEach((skill, skillIndex) => {
            const skillNode: NodeType = { 
                id: skill, 
                group: "skill", 
                radius: 8, 
                color: catColor 
            };
            nodes.push(skillNode);
            // Link to Category
            links.push({ source: cat.name, target: skill, value: 1.5, isNeural: false });

            // Create "Neural Web" connections
            if (skillIndex > 0) {
                links.push({
                    source: skill,
                    target: cat.skills[skillIndex - 1],
                    value: 0.5,
                    isNeural: true
                });
            }
             // Random inter-connections between same category to make it denser
            if (skillIndex > 1 && Math.random() > 0.5) {
                links.push({
                    source: skill,
                    target: cat.skills[skillIndex - 2],
                    value: 0.3,
                    isNeural: true
                });
            }
            // Close the loop
            if (skillIndex === cat.skills.length - 1 && cat.skills.length > 2) {
                 links.push({
                    source: skill,
                    target: cat.skills[0],
                    value: 0.5,
                    isNeural: true
                });
            }
        });
    });

    // Force Simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance((d: any) => {
          if (d.target.group === 'category') return 140;
          if (d.isNeural) return 50; 
          return 90;
      }))
      .force("charge", d3.forceManyBody().strength((d: any) => {
          if (d.group === 'root') return -1000;
          if (d.group === 'category') return -600;
          return -150;
      }))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius * 1.5).strength(0.8));

    // Render Lines
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: any) => d.isNeural ? d.source.color : "#333") 
      .attr("stroke-width", (d: any) => d.isNeural ? 0.5 : Math.sqrt(d.value))
      .style("filter", (d: any) => d.isNeural ? "url(#glow)" : "none")
      .attr("opacity", (d: any) => d.isNeural ? 0.2 : 0.4);

    // Render Nodes Group
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call((d3.drag() as any)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    // Glow Aura (Back)
    node.append("circle")
        .attr("r", (d: any) => d.radius + (d.group === 'root' ? 10 : 5))
        .attr("fill", (d: any) => d.group === 'root' ? "rgba(255,255,255,0.05)" : d.color)
        .attr("fill-opacity", 0.1)
        .style("filter", "url(#glow)");

    // Main Node Circle
    const circles = node.append("circle")
        .attr("r", (d: any) => d.radius)
        .attr("fill", (d: any) => d.group === 'root' ? "#fff" : "#0a0a0a")
        .attr("stroke", (d: any) => d.group === 'root' ? "none" : d.color)
        .attr("stroke-width", (d: any) => d.group === 'skill' ? 1.5 : 3)
        .transition().duration(1000) // Initial animation
        .attrTween("r", (d: any) => {
            const i = d3.interpolate(0, d.radius);
            return (t: number) => i(t);
        });

    // Node Labels
    const labels = node.append("text")
        .text((d: any) => d.id)
        .attr("text-anchor", "middle")
        .attr("dy", (d: any) => d.group === 'skill' ? ".35em" : (d.group === 'root' ? ".35em" : "0.35em"))
        .attr("dx", (d: any) => d.group === 'skill' ? (d.radius + 5) : 0) // Shift skill text right
        .attr("text-anchor", (d: any) => d.group === 'skill' ? "start" : "middle")
        .attr("fill", (d: any) => d.group === 'root' ? "#000" : "#fff")
        .attr("font-weight", (d: any) => d.group === 'skill' ? "normal" : "bold")
        .attr("font-size", (d: any) => d.group === 'root' ? "14px" : (d.group === 'category' ? "12px" : "11px"))
        .style("pointer-events", "none")
        .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)")
        .style("paint-order", "stroke") // Makes the stroke be drawn behind the text
        .style("stroke", "#050505") // Dark background for text
        .style("stroke-width", "4px")
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round");


    // Pulse Animation Function
    const pulse = (selection: d3.Selection<any, any, any, any>) => {
        selection
            .transition()
            .duration(2500)
            .ease(d3.easeSineInOut)
            .attr("r", (d: any) => d.radius * 1.15)
            .transition()
            .duration(2500)
            .ease(d3.easeSineInOut)
            .attr("r", (d: any) => d.radius)
            .on("end", function(this: any) { pulse(d3.select(this)); });
    };

    // Apply pulse to skill nodes
    node.selectAll("circle")
        .filter((d: any) => d.group === 'skill')
        .each(function(this: any) {
             // Add random delay for organic feel
             const circle = d3.select(this);
             circle.transition()
                .delay(Math.random() * 2000)
                .on("start", () => pulse(circle));
        });


    // Hover Interactions
    node.on("mouseover", (event, d: any) => {
        // Dim all
        link.transition().duration(200).style("opacity", 0.05);
        node.selectAll("circle").transition().duration(200).style("opacity", 0.1);
        node.selectAll("text").transition().duration(200).style("opacity", 0.1);
        
        // Highlight current
        const currentNode = d3.select(event.currentTarget);
        // Note: transition() here cancels the pulse
        currentNode.selectAll("circle").transition().duration(200)
            .style("opacity", 1)
            .attr("stroke-width", 4)
            .attr("r", (n: any) => n.radius); // Reset radius on hover to stop pulse artifact
            
        currentNode.selectAll("text").transition().duration(200).style("opacity", 1);

        // Find neighbors
        const neighborIds = new Set<string>();
        neighborIds.add(d.id);
        
        // Highlight connected links and neighbors
        link.filter((l: any) => {
             const sourceId = l.source.id;
             const targetId = l.target.id;
             return sourceId === d.id || targetId === d.id;
        })
        .transition().duration(200)
        .style("opacity", 1)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .each((l: any) => {
            neighborIds.add(l.source.id);
            neighborIds.add(l.target.id);
        });

        // Highlight neighbor nodes
        node.filter((n: any) => neighborIds.has(n.id))
            .selectAll("circle")
            .transition().duration(200)
            .style("opacity", 1)
            .attr("stroke", (n: any) => n.color)
            .attr("fill", (n: any) => n.group === 'skill' ? n.color : (n.group === 'root' ? '#fff' : '#0a0a0a'))
            .attr("r", (n: any) => n.radius); // Ensure neighbors are also stable size

        node.filter((n: any) => neighborIds.has(n.id))
            .selectAll("text")
            .transition().duration(200)
            .style("opacity", 1);
    })
    .on("mouseout", (event, d: any) => {
        // Reset all
        link.transition().duration(300)
            .style("opacity", (l: any) => l.isNeural ? 0.2 : 0.4)
            .attr("stroke", (l: any) => l.isNeural ? l.source.color : "#333")
            .attr("stroke-width", (l: any) => l.isNeural ? 0.5 : Math.sqrt(l.value));
        
        node.selectAll("circle").transition().duration(300)
            .style("opacity", 1)
            .attr("stroke-width", (n: any) => n.group === 'skill' ? 1.5 : 3)
            .attr("fill", (n: any) => n.group === 'root' ? "#fff" : "#0a0a0a")
            .attr("r", (n: any) => n.radius)
            .on("end", function(this: any, n: any) {
                // Restart pulse for skill nodes
                if (n.group === 'skill') {
                    pulse(d3.select(this));
                }
            });

        node.selectAll("text").transition().duration(300).style("opacity", 1);
    });

    // Simulation Tick
    simulation.on("tick", () => {
      // Constrain nodes to boundaries with padding
      const padding = 20;
      
      nodes.forEach((d: any) => {
        d.x = Math.max(padding + d.radius, Math.min(width - padding - d.radius, d.x));
        d.y = Math.max(padding + d.radius, Math.min(height - padding - d.radius, d.y));
      });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag Functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      d3.select(event.sourceEvent.target.parentNode).select("circle")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4);
    }

    function dragged(event: any, d: any) {
      const padding = 20;
      d.fx = Math.max(padding + d.radius, Math.min(width - padding - d.radius, event.x));
      d.fy = Math.max(padding + d.radius, Math.min(height - padding - d.radius, event.y));
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d3.select(event.sourceEvent.target.parentNode).select("circle")
        .attr("stroke", d.color || (d.group === 'root' ? 'none' : null))
        .attr("stroke-width", (n: any) => n.group === 'skill' ? 1.5 : 3);
      
      // Attempt to restart pulse if it's a skill node
      const circle = d3.select(event.sourceEvent.target.parentNode).select("circle");
      if (d.group === 'skill') {
         pulse(circle);
      }
    }

  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[700px] overflow-hidden bg-[#050505] rounded-3xl border border-white/10 relative shadow-2xl shadow-black/50 group">
        <div className="absolute top-6 left-6 z-10 pointer-events-none select-none">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_#2997ff]"></span>
                System Core
            </h3>
            <p className="text-gray-500 text-xs mt-1 font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                INTERACTIVE NEURAL MAP v2.5<br/>
                Hover to analyze connections. Drag to reorganize.
            </p>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-6 right-6 z-10 pointer-events-none flex flex-col gap-2 items-end">
             {SKILLS.map((cat, i) => (
                 <div key={i} className="flex items-center gap-2 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/5 shadow-lg">
                     <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">{cat.name}</span>
                     <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: colors[i % colors.length], color: colors[i % colors.length] }}></span>
                 </div>
             ))}
        </div>

      <svg ref={svgRef} className="w-full h-full active:cursor-grabbing"></svg>
    </div>
  );
};

export default SkillsViz;
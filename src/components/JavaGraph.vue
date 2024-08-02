<template>
    <div id="background">
    <div ref="tree">
    </div>
</div>
</template>
  
<script>
import * as d3 from 'd3';

export default {
    name: 'JavaGraph',
    data() {
        return {
            data: {
                name: 'Java',
                children: [{
                        name: 'Philosophy',
                        children: [
                            { name: 'Platform Independence', description: 'Java programs can run on any device that has a compatible JVM.' },
                            { name: 'Object-Oriented', description: 'Java follows the principles of OOP, such as inheritance, encapsulation, polymorphism, and abstraction.' },
                            { name: 'Security', description: 'Java includes security features to protect against threats like viruses and tampering.' },
                            { name: 'Distributed Computing', description: 'Java supports distributed computing, enabling programs to communicate across networks.' }
                        ]
                    },
                    {
                        name: 'History',
                        children: [
                            { name: '1995: Initial Release', description: 'Java was first released by Sun Microsystems.' },
                            { name: '1999: Enterprise Edition', description: 'Introduction of J2EE for enterprise applications.' },
                            { name: '2004: Open Source', description: 'Java was made open source under the GNU General Public License.' },
                            { name: '2010: Oracle Acquisition', description: 'Oracle acquired Sun Microsystems and took over Java development.' }
                        ]
                    },
                    {
                        name: 'Core',
                        children: [
                            { name: 'Collections', url: 'https://docs.oracle.com/javase/tutorial/collections/' },
                            { name: 'Concurrency', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/' },
                            { name: 'I/O', url: 'https://docs.oracle.com/javase/tutorial/essential/io/' }
                        ]
                    },
                    {
                        name: 'Frameworks',
                        children: [
                            { name: 'Spring', url: 'https://spring.io/' },
                            { name: 'Hibernate', url: 'https://hibernate.org/' },
                            { name: 'Struts', url: 'https://struts.apache.org/' },
                            {
                                name: 'Web Frameworks',
                                children: [
                                    { name: 'JSF', url: 'https://www.oracle.com/java/technologies/javaserverfaces.html' },
                                    { name: 'Vaadin', url: 'https://vaadin.com/' },
                                    { name: 'Grails', url: 'https://grails.org/' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Tools',
                        children: [
                            { name: 'Maven', url: 'https://maven.apache.org/' },
                            { name: 'Gradle', url: 'https://gradle.org/' },
                            { name: 'Ant', url: 'https://ant.apache.org/' }
                        ]
                    },
                    {
                        name: 'Libraries',
                        children: [
                            { name: 'Guava', url: 'https://github.com/google/guava' },
                            { name: 'Apache Commons', url: 'https://commons.apache.org/' },
                            { name: 'Jackson', url: 'https://github.com/FasterXML/jackson' }
                        ]
                    },
                    {
                        name: 'Package Managers',
                        children: [
                            { name: 'Maven', url: 'https://maven.apache.org/' },
                            { name: 'Gradle', url: 'https://gradle.org/' },
                            { name: 'Ivy', url: 'https://ant.apache.org/ivy/' }
                        ]
                    },
                    {
                        name: 'Template Engines',
                        children: [
                            { name: 'Thymeleaf', url: 'https://www.thymeleaf.org/' },
                            { name: 'Freemarker', url: 'https://freemarker.apache.org/' },
                            { name: 'Velocity', url: 'https://velocity.apache.org/' }
                        ]
                    }
                ]
            },
        };
    },
    mounted() {
        this.createTree();
    },
    methods: {
      createTree() {
        const width = 800;
        const height = 800;
        const radius = Math.min(width, height) / 2 - 100;

        const svg = d3.select(this.$refs.tree)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .call(d3.zoom().on('zoom', (event) => {
            svg.attr('transform', event.transform);
          }))
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        // グリッド線を追加
        const gridSize = 20;
        const grid = svg.append('g')
          .attr('class', 'grid');

        for (let x = -width / 2; x <= width / 2; x += gridSize) {
          grid.append('line')
            .attr('x1', x)
            .attr('y1', -height / 2)
            .attr('x2', x)
            .attr('y2', height / 2)
            .attr('stroke', '#232323')
            .attr('stroke-width', 0.5);
        }

        for (let y = -height / 2; y <= height / 2; y += gridSize) {
          grid.append('line')
            .attr('x1', -width / 2)
            .attr('y1', y)
            .attr('x2', width / 2)
            .attr('y2', y)
            .attr('stroke', '#232323')
            .attr('stroke-width', 0.5);
        }

        const root = d3.hierarchy(this.data);
        const cluster = d3.cluster().size([2 * Math.PI, radius]);

        cluster(root);

        svg.selectAll('.link')
          .data(root.links())
          .enter().append('path')
          .attr('class', 'link')
          .attr('d', d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

        const node = svg.selectAll('.node')
          .data(root.descendants())
          .enter().append('g')
          .attr('class', 'node')
          .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

        node.append('circle')
          .attr('r', 5);

        node.append('a')
          .attr('xlink:href', d => d.data.url || '#')
          .append('text')
          .attr('dy', 3)
          .attr('x', d => d.x < Math.PI === !d.children ? 8 : -8)
          .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
          .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
          .text(d => d.data.name);

        // スタイリング
        svg.selectAll('.link')
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .attr('stroke-width', '2px');

        svg.selectAll('.node circle')
          .attr('fill', '#fff')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', '3px');

        svg.selectAll('.node text')
          .attr('font-size', '12px')
          .attr('font-family', 'sans-serif')
          .attr('fill', '#50C878');
      }
    },
}
</script>
  
<style scoped>
#background {
    background-color: #000000;
  }

.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
}

.node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 3px;
}

.node text {
    font: 12px sans-serif;
    fill: #50C878;
}
</style>
  